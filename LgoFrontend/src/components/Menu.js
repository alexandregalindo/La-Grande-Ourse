import React, {useRef } from 'react';
import { PanelMenu } from 'primereact/panelmenu';




export default function Menu({ setCurrentContent }) {
  const userRole = localStorage.getItem('userRole');
  const menuRef = useRef(null);
  console.log(userRole)
  const defaultItems = [
   
    {
        label: 'Tableau de bord',
        icon: 'pi pi-chart-line',
        command: () => setCurrentContent('default')
      },
      
    {
      label: 'Gérer les données du revenu GL',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Insérer les données',
          icon: 'pi pi-fw pi-pencil',
          command: () => setCurrentContent('Revenu')
        },
      ],
    },
    {
      label: 'Analyser les revenus globaux',
      icon: 'pi pi-chart-line',
      items: [
        {
          label: 'Comparaison Mensuelle',
          icon: 'pi pi-chart-bar',
          command: () => setCurrentContent('Copmmensuelle')
          
        },
        {
          label: 'Comparaison Trimestrielle',
          icon: 'pi pi-chart-bar',
          command: () => setCurrentContent('Copmtrimestrielle')
            
          
        },
        
        {
          label: 'Comparaison Annuelle',
          icon: 'pi pi-chart-bar',
          command: () => setCurrentContent('Copmannuelle')
        },
      ],
    },
    {
      label: 'Analyse des revenu par département',
      icon: 'pi pi-chart-line',
      items: [
        {
          label: 'Comparaison Annuelle',
          icon: 'pi pi-chart-bar',
          command: () => setCurrentContent('Copmdepartement')
        },
      ],
    },
  
   
     
      
  ];

  const adminItems = [
    {
        label: 'Gérer les Utilisateurs',
        icon: 'pi pi-fw pi-pencil',
        items: [
            {
                label: 'Gérer Utilisateurs',
                icon: 'pi pi-fw pi-pencil',
                command: () => setCurrentContent('Userliste')
            },
        ],
    },
    {
        label: 'Gérer les Départements',
        items: [
            {
                label: 'Gérer Départements',
                icon: 'pi pi-fw pi-pencil',
                command: () => setCurrentContent('gererDepartements')
            },
        ],
    },
];

let items = [...defaultItems];

if (userRole === '1') {
    items = [...items, ...adminItems];
}

  
const handleItemClick = (e) => {
  if (menuRef.current && menuRef.current.state) {
      menuRef.current.state.id = null;
  }
};

return (
  <div className="card2" onClick={handleItemClick}>
      <PanelMenu ref={menuRef} model={items} className="w-full md:w-25rem" />
  </div>
);
}



