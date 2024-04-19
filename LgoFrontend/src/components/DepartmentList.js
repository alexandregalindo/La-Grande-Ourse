import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import DepartmentService from '../services/DepartmentService';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);
    const [departmentToDelete, setDepartmentToDelete] = useState(null);

    useEffect(() => {
        DepartmentService.findAll().then(data => setDepartments(data));
    }, []);

    const addDepartment = (data) => {
        axios.post('http://lagrandeourse.institutgrassetinfo.com:4081/api/departments', data)
            .then(response => {
                const newDepartment = response.data;
                setDepartments(prevDepartments => [...prevDepartments, newDepartment]);
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout du département:", error);
            });

        setDisplayDialog(false);
    };

    const deleteDepartment = (departmentId) => {
        axios.delete(`http://lagrandeourse.institutgrassetinfo.com:4081/api/departments/${departmentId}`)
            .then(response => {
                // Mise à jour de la liste des départements après la suppression
                DepartmentService.findAll().then(data => setDepartments(data));
            })
            .catch(error => {
                console.error('Erreur lors de la suppression du département:', error);
            })
            .finally(() => {
                // Fermez la boîte de dialogue, que la suppression ait réussi ou échoué.
                setDisplayDeleteDialog(false);
            });
    }

    const editDepartment = (data) => {
        axios.put(`http://lagrandeourse.institutgrassetinfo.com:4081/api/departments/${editingDepartment.id}`, data)
            .then(response => {
                DepartmentService.findAll().then(data => setDepartments(data));
            })
            .catch(error => {
                console.error('Erreur lors de la modification du département:', error);
            });
        setDisplayDialog(false);
        setEditingDepartment(null);
    };


    const showAddDialog = () => {
        setEditingDepartment(null);
        setDisplayDialog(true);
    };

    const showEditDialog = (department) => {
        setEditingDepartment(department);
        setDisplayDialog(true);
    };
    const showDeleteDialog = (department) => {
        setDepartmentToDelete(department);
        setDisplayDeleteDialog(true);
    };

    return (
        <div>
            <h1>Liste des départements</h1>
            <Button label="Ajouter un département" icon="pi pi-plus" onClick={showAddDialog} />

            <DataTable value={departments} paginator rows={5} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID"></Column>
                <Column field="name" header="Nom du département" sortable ></Column>
                <Column
                    body={(rowData) => (
                        <React.Fragment>
                            <Button
                                label="Modifier"
                                icon="pi pi-pencil"
                                className="p-button-rounded p-button-warning p-button-outlined"
                                onClick={() => showEditDialog(rowData)}
                            />
                            <Button
                                label="Supprimer"
                                icon="pi pi-trash"
                                className="p-button-rounded p-button-danger p-button-outlined"
                                onClick={() => showDeleteDialog(rowData)}
                            />
                        </React.Fragment>
                    )}
                    header="Actions"
                ></Column>

            </DataTable>

            <Dialog
                header={editingDepartment ? 'Modifier le département' : 'Ajouter un département'}
                visible={displayDialog}
                onHide={() => setDisplayDialog(false)}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const data = { name: e.target.elements.departmentName.value };
                        if (editingDepartment) {
                            editDepartment(data);
                        } else {
                            addDepartment(data);
                        }
                    }}

                >
                    <div className="p-inputgroup">
                        <input
                            name="departmentName"
                            type="text"
                            placeholder="Nom du département"
                            defaultValue={editingDepartment ? editingDepartment.name : ''}
                        />
                        <Button label="Enregistrer" icon="pi pi-check" type="submit" />
                        <Button label="Annuler" icon="pi pi-times" onClick={() => setDisplayDialog(false)} />
                    </div>
                </form>
            </Dialog>
            <Dialog
                header="Confirmez la suppression"
                visible={displayDeleteDialog}
                onHide={() => setDisplayDeleteDialog(false)}>
                <p>Voulez-vous vraiment supprimer ce département ?</p>
                <Button label="Oui" onClick={() => deleteDepartment(departmentToDelete.id)} />
                <Button label="Non" onClick={() => setDisplayDeleteDialog(false)} />
            </Dialog>
        </div>
    );
};

export default DepartmentList;
