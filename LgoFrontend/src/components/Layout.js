// Layout.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'primereact/button';
import Menu from './Menu';
import LineDemo from './LineDemo';
import Revenu from './Revenu';
import DepartmentList from './DepartmentList';
import Copmannuelle from './Copmannuelle';
import Copmmensuelle from './Copmmensuelle';
import Copmdepartement from './Copmdepartement';
import Copmtrimestrielle from './Copmtrimestrielle';
import Userliste from './Userlist'



import '../css/Layout.css';
import logo from '../img/logo.png';

function Layout({ children }) {
    const history = useHistory();

    const [currentContent, setCurrentContent] = useState("default");
    const token = localStorage.getItem('authToken');
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    const handleLogout = () => {
        // Supprimer les informations de l'utilisateur du localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        // Rediriger l'utilisateur vers la page de connexion
        history.push('/'); 
    };
    

    if (token) {

        return (

            <div className="layout-container">
                <div id="loadingImg" style={{ 
                zIndex: 1000, 
                position: 'absolute', 
                backgroundColor: '#747474', 
                opacity: '50%', 
                width: '100%', 
                height: '100%', 
                display: 'none', 
                justifyContent: 'center', 
                alignItems: 'center' 
                }}>
                    <img src="https://i.gifer.com/ZKZg.gif" />
                </div>

                <header className="layout-header">
                    <img src={logo} alt="Logo" className="logo" />

                    <div className="user-info">
                 
                        <Button 
                            icon="pi pi-user" 
                            label={`Bonjour ${userName || "Utilisateur"}`}
                            rounded 
                            outlined 
                            severity="info" 
                            aria-label="User" 
                        />
                        <div className="logout-button-container">
                <Button label="Déconnexion" icon="pi pi-power-off" onClick={handleLogout} />
            </div>
                       
                    </div>
                </header>
                <div className="layout-body">


                <nav className="layout-menu">
                    {/* Menu pour tous les utilisateurs */}
                    <Menu setCurrentContent={setCurrentContent} />

                 
                </nav>

                    <main className="layout-content">
                        {currentContent === "default" && <LineDemo />}
                        {userRole === '1' && currentContent === "gererDepartements" && <DepartmentList />}
                        {currentContent === "Copmannuelle" && <Copmannuelle />}
                        {currentContent === "Copmtrimestrielle" && <Copmtrimestrielle />}
                        {currentContent === "Copmmensuelle" && <Copmmensuelle />}
                        {currentContent === "Copmdepartement" && <Copmdepartement />}
                        {currentContent === "Revenu" && <Revenu />}
                        {userRole === '1' && currentContent === "Userliste" && <Userliste />}
                    </main>

                </div>
            </div>
        );
    } else {
        // User is not authenticated
    }
}

export default Layout;
