import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';


import UserService from '../services/UserService';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    const [role, setRole] = useState(0);  // par défaut, on le fixe à utilisateur


    const roleOptions = [
        { label: 'Utilisateur', value: 0 },
        { label: 'Administrateur', value: 1 }
    ];



    useEffect(() => {
        UserService.findAll()
            .then(data => setUsers(data))
            .catch(error => {
                console.error("Erreur lors de la récupération des utilisateurs:", error);
            });
    }, []);

    const showAddDialog = () => {
        setEditingUser(null);
        setDisplayDialog(true);
    }

    const showEditDialog = (user) => {
        setEditingUser(user);
        setRole(user.role);
        setDisplayDialog(true);
    }

    const showDeleteDialog = (user) => {
        setUserToDelete(user);
        setDisplayDeleteDialog(true);
    }

    const addUser = (data) => {

        const formattedData = {
            Id: null,
            Nom: data.Nom,
            Email: data.Email,
            Password: data.Password,
            Role: data.Role
        };

        axios.post('http://lagrandeourse.institutgrassetinfo.com:4081/api/user', formattedData)
            .then(response => {
                const newUser = response.data;
                setUsers(prevUsers => [...prevUsers, newUser]);
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout de l'utilisateur:", error);
            });

        setDisplayDialog(false);
    }

    const editUser = (data) => {
        const formattedData = {
            Id: editingUser.Id,
            Nom: data.Nom,
            Email: data.Email,
            Password: data.Password,
            Role: data.Role
        };
        axios.put(`http://lagrandeourse.institutgrassetinfo.com:4081/api/user/${editingUser.Id}`, formattedData)
            .then(response => {
                UserService.findAll().then(data => setUsers(data));
            })
            .catch(error => {
                console.error("Erreur lors de la modification de l'utilisateur:", error);
            });

        setDisplayDialog(false);
        setEditingUser(null);
    }

    const deleteUser = (userId) => {

        axios.delete(`http://lagrandeourse.institutgrassetinfo.com:4081/api/user/${userId}`)
            .then(response => {
                UserService.findAll().then(data => setUsers(data));
            })
            .catch(error => {
                console.error("Erreur lors de la suppression de l'utilisateur:", error);
            })
            .finally(() => {
                setDisplayDeleteDialog(false);
            });


    }

    return (
        <div>
            <h1>Gestion des Utilisateurs</h1>
            <Button label="Add User" icon="pi pi-plus" onClick={showAddDialog} />

            <DataTable value={users} paginator rows={5} tableStyle={{ minWidth: '70rem' }}>
                <Column field="Id" header="ID"></Column>
                <Column field="Nom" header="Name" sortable ></Column>
                <Column field="Email" header="Email" sortable ></Column>
                <Column
                    body={(rowData) => (
                        <React.Fragment>
                            <Button
                                label="Edit"
                                icon="pi pi-pencil"
                                className="p-button-rounded p-button-warning p-button-outlined"
                                onClick={() => showEditDialog(rowData)}
                            />
                            <Button
                                label="Delete"
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
                header={editingUser ? 'Edit User' : 'Add User'}
                visible={displayDialog}
                onHide={() => setDisplayDialog(false)}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const data = {
                            Nom: e.target.elements.userName.value,
                            Email: e.target.elements.userEmail.value,
                            Password: e.target.elements.userPassword.value,
                            Role: role
                        };
                        if (editingUser) {
                            editUser(data);
                        } else {
                            addUser(data);
                        }
                    }}
                >
                    <div className="p-inputgroup">
                        <input
                            name="userName"
                            type="text"
                            placeholder="Name"
                            defaultValue={editingUser ? editingUser.Nom : ''}
                        />
                        <input
                            name="userEmail"
                            type="email"
                            placeholder="Email"
                            defaultValue={editingUser ? editingUser.Email : ''}
                        />
                        <input
                            name="userPassword"
                            type="password"
                            placeholder="Mot de passe"
                        />
                        <Dropdown
                            value={role}
                            options={roleOptions}
                            onChange={(e) => setRole(e.value)}
                            placeholder="Sélectionnez un rôle"
                        />

                        <Button label="Save" icon="pi pi-check" type="submit" />
                        <Button label="Cancel" icon="pi pi-times" onClick={() => setDisplayDialog(false)} />
                    </div>
                </form>
            </Dialog>

            <Dialog
                header="Confirm Deletion"
                visible={displayDeleteDialog}
                onHide={() => setDisplayDeleteDialog(false)}>
                <p>Are you sure you want to delete this user?</p>
                <Button label="Yes" onClick={() => deleteUser(userToDelete.Id)} />
                <Button label="No" onClick={() => setDisplayDeleteDialog(false)} />
            </Dialog>
        </div>
    );
}

export default UserManagement;
