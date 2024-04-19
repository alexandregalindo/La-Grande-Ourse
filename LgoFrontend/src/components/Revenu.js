import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import '../css/Layout.css';


import RevenuService from '../services/RevenuService';
import TaxService from '../services/TaxService';

export default function Revenu() {


    const [revenus, setRevenu] = useState([]);
    const [date, setDate] = useState(new Date());
    const [dynamicColumns, setDynamicColumns] = useState([]);
    const [taxData, setTaxData] = useState([]);
    const [dialogDate, setDialogDate] = useState(new Date());
    const [dialogId, setDialogId] = useState('');
    const [dialogName, setDialogName] = useState('');
    const [dialogAmount, setDialogAmount] = useState('');
    const [displayDialog, setDisplayDialog] = useState(false);
    const [currentRowData, setCurrentRowData] = useState(null);
    const [selectedDay, setSelectedDay] = useState('');
    const [jourDeLaSemaine, setJourDeLaSemaine] = useState('');
    const [dateChoisie, setDateChoisie] = useState(new Date());

    const [donneesTaxeEdition, setDonneesTaxeEdition] = useState(null);
    const today = new Date();


    const ouvrirDialogueEdition = (rowData) => {
        setDonneesTaxeEdition(rowData); // Définir les données dans l'état
        setDisplayDialog(true); // Ouvrir le dialogue
    };

    const refreshTaxData = async () => {
        try {
            // Supposons que findAllByDate est votre méthode pour récupérer les données de taxe
            const response = await TaxService.findAllByDate(dateChoisie);
            setTaxData(response); // Met à jour l'état de taxData avec les nouvelles données
        } catch (error) {
            console.error("Erreur lors du rafraîchissement des données des taxes", error);
        }
    };

    const soumettreDonneesTaxe = async () => {
        try {
            const response = await axios.put(`http://lagrandeourse.institutgrassetinfo.com:4081/api/dailytotals/${donneesTaxeEdition.Date}`, donneesTaxeEdition);


            if (response.status === 200) {
                console.log("Données mises à jour avec succès");
                // Fermer le Dialog
                setDisplayDialog(false);

                // Rafraîchir la DataTable taxData
                refreshTaxData();

                // Vous pouvez ici mettre à jour votre état local ou faire d'autres actions
            } else {
                console.error("Erreur lors de la mise à jour des données");
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi de la requête", error);
        }
    }





    const isPositiveInteger = (val) => {
        let str = String(val);

        str = str.trim();

        if (!str) {
            return false;
        }

        str = str.replace(/^0+/, '') || '0';
        let n = Math.floor(Number(str));

        return n !== Infinity && String(n) === str && n >= 0;
    };


    const moveToPreviousTuesday = (date) => {
        while (date.getDay() !== 2) { // 2 représente mardi
            date.setDate(date.getDate() - 1);
        }
        return date;
    }
    const joursDeLaSemaine = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    const jourSemaine = joursDeLaSemaine[dateChoisie.getDay()];
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetch('http://lagrandeourse.institutgrassetinfo.com:4081/api/dailyEntry')
            .then(res => res.json())
            .then(data => setEntries(data));
    }, []);




    /******************************** */
    const generateWeekColumns = (selectedDate) => {
        const jours = ["Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        const dates = [];
        const mardi = moveToPreviousTuesday(new Date(selectedDate));

        for (let i = 0; i < 6; i++) {
            const currentDay = new Date(mardi);
            currentDay.setDate(currentDay.getDate() + i);
            const formattedDate = `${currentDay.getDate()}/${currentDay.getMonth() + 1}/${currentDay.getFullYear()}`;
            dates.push(formattedDate);
        }

        let columns = [];
        for (let i = 0; i < jours.length; i++) {
            columns.push({ field: `jour${i}`, header: jours[i] });
            columns.push({ field: `date${i}`, header: dates[i] });
        }
        return columns;
    };



    const handleSubmit = async () => {


        console.log("Je suis la");

        const date1 = dateFormatee;
        const id_dept = currentRowData.departmentId;
        const montant = currentRowData[jourSemaine];

        const data = {
            Date: date1,
            Id_dept: id_dept,
            montant: montant
        };



        try {
            const response = await axios.put(`/api/dailyEntry/${date1}/${id_dept}`, data);
            console.log(response.data);

        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        }
        setDisplayDialog(false);
    }

    const onCellEditComplete = async (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        if (newValue == null)
            newValue = 0;

        if (newValue.toString().trim().length > 0) {
            rowData[field] = newValue;

            const sousTot =
                (rowData.mardi || 0) +
                (rowData.mercredi || 0) +
                (rowData.jeudi || 0) +
                (rowData.vendredi || 0) +
                (rowData.samedi || 0) +
                (rowData.dimanche || 0);

            rowData.sousTot = sousTot;
        }

        else {
            event.preventDefault();
        }

        await RevenuService.upsertRevenu(rowData.departmentId, date, field, newValue);
        const totalDesDepartements = await RevenuService.getDailyEntryMontantByDate(date);
        await RevenuService.updateTotalDesDepartements(date, totalDesDepartements);
        const cumulat = await RevenuService.updateCumulatFromYear(rowData.departmentId, date);
        rowData.cumulat = cumulat;

        taxData.Total_Des_Departements = totalDesDepartements.toString();
        setTaxData(taxData);
        await refreshTaxData();
    };

    const cellEditor = (options) => {
        return priceEditor(options);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} mode="currency" currency="USD" locale="en-US" />;
    };

    const priceEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.target.value)} mode="currency" currency="USD" locale="en-US" />;
    };


    const handleDateChange = (e) => {
        document.getElementById('loadingImg').style.display = 'flex';

        let isRevenuFinished = false;
        let isTaxFinished = false;

        setDate(e.value);
        const newDate = e.value;
        setDateChoisie(newDate);

        let jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        let jour = jours[newDate.getDay()];
        setSelectedDay(jourDeLaSemaine);

        const newColumns = generateWeekColumns(e.value);
        setDynamicColumns(newColumns);

        RevenuService.findAll(e.value).then(data => {
            setRevenu(data);
            isRevenuFinished = true;

            if (isTaxFinished && isRevenuFinished)
                document.getElementById('loadingImg').style.display = 'none';
        });

        TaxService.findAllByDate(e.value).then(data => {
            setTaxData(data);
            isTaxFinished = true;

            if (isTaxFinished && isRevenuFinished)
                document.getElementById('loadingImg').style.display = 'none';
        });
    };


    let dateFormatee = `${jourDeLaSemaine} ${dateChoisie.getDate()}/${dateChoisie.getMonth() + 1}/${dateChoisie.getFullYear()}`;











    return (
        <div className="card p-fluid">





            <Dialog visible={displayDialog} style={{ width: '50vw' }} header="Modifier les Données de Taxe" modal onHide={() => setDisplayDialog(false)}>
                {donneesTaxeEdition && (
                    <div>
                        <h3>{jourSemaine} {donneesTaxeEdition.Date}</h3>

                        <div className="p-field">
                            <label htmlFor="tps">PO:</label>

                            <InputText value={donneesTaxeEdition.PO || ''} onChange={(e) => setDonneesTaxeEdition({ ...donneesTaxeEdition, PO: e.target.value })} />
                        </div>

                        <div className="p-field">
                            <label htmlFor="tps">TPS:</label>
                            <InputText
                                id="tps"
                                value={donneesTaxeEdition.TPS || ''}
                                onChange={(e) => setDonneesTaxeEdition({ ...donneesTaxeEdition, TPS: e.target.value })}
                            />
                        </div>

                        <div className="p-field">
                            <label htmlFor="tvq">TVQ:</label>
                            <InputText
                                id="tvq"
                                value={donneesTaxeEdition.TVQ || ''}
                                onChange={(e) => setDonneesTaxeEdition({ ...donneesTaxeEdition, TVQ: e.target.value })}
                            />
                        </div>

                        <div className="p-field">
                            <label htmlFor="tvq">Total Des Departements:</label>
                            <InputText
                                id="totalDepartements"
                                value={donneesTaxeEdition.Total_Des_Departements || ''}
                                onChange={(e) => setDonneesTaxeEdition({ ...donneesTaxeEdition, Total_Des_Departements: e.target.value })}
                                disabled
                            />
                        </div>

                        <div className="p-field">
                            <label htmlFor="rabais">Rabais:</label>
                            <InputText
                                id="rabais"
                                value={donneesTaxeEdition.Rabais || ''}
                                onChange={(e) => setDonneesTaxeEdition({ ...donneesTaxeEdition, Rabais: e.target.value })}
                            />
                        </div>



                        <Button label="Soumettre" onClick={soumettreDonneesTaxe} />
                    </div>
                )}
            </Dialog>





            <h1>Saisire les données des revenus :</h1>
            <h3>Date debut de semaine:</h3>
            <div className="card flex justify-content-center">
                <Calendar className='dateInput'
                    value={date} onChange={handleDateChange}
                    showIcon={true}
                    maxDate={today} />
            </div>


            <DataTable value={revenus} editMode="cell" tableStyle={{ minWidth: '50rem' }}>
                <Column field="departmentId" header="ID"></Column>
                <Column field="departmentName" header="Name"></Column>
                <Column field="mardi" header="Mardi" editor={(props) => cellEditor(props)} onCellEditComplete={onCellEditComplete}></Column>
                <Column field="mercredi" header="Mercredi" editor={(props) => cellEditor(props)} onCellEditComplete={onCellEditComplete}></Column>
                <Column field="jeudi" header="Jeudi" editor={(props) => cellEditor(props)} onCellEditComplete={onCellEditComplete}></Column>
                <Column field="vendredi" header="Vendredi" editor={(props) => cellEditor(props)} onCellEditComplete={onCellEditComplete}></Column>
                <Column field="samedi" header="Samedi" editor={(props) => cellEditor(props)} onCellEditComplete={onCellEditComplete}></Column>
                <Column field="dimanche" header="Dimanche" editor={(props) => cellEditor(props)} onCellEditComplete={onCellEditComplete}></Column>
                <Column field="sousTot" header="Sous Tot"></Column>
                <Column field="cumulat" header="CUMULAT"></Column>
            </DataTable>


            <h1>Saisire les données des taxes :</h1>
            <DataTable value={[taxData]}  >
                <Column
                    body={(rowData) => (
                        <Button
                            label=""
                            icon="pi pi-pencil"
                            className="p-button-text"
                            onClick={() => ouvrirDialogueEdition(rowData)}
                        />
                    )}
                    headerStyle={{ width: '8em', textAlign: 'center' }}
                    bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                />
                <Column field="Date" header="Date" ></Column>
                <Column field="PO" header="PO" ></Column>
                <Column field="TPS" header="TPS" ></Column>
                <Column field="TVQ" header="TVQ" ></Column>
                <Column field="Total_Des_Departements" header="Total Des Departements" ></Column>
                <Column field="Rabais" header="Rabais" ></Column>
            </DataTable>

        </div>
    );





}
