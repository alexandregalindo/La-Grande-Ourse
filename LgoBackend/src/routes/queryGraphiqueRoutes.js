const express = require('express');
const mysql = require('mysql');
const router = express.Router();

// Configurações do pool de conexões com o banco de dados
const pool = mysql.createPool({
    connectionLimit: 10, // número de conexões simultâneas permitidas
    host: '23.235.197.135',
    user: 'instit43_GOurse_DB_adm',
    password: 'LGO@ig23',
    database: 'instit43_GrandeOurse_DB_test'
});

router.get('/diff', (req, res) => {
    const query2022 = `
    WITH Montante2022 AS (
        SELECT ID_DEPT, SUM(MONTANT) AS SomaMontante2022
        FROM DailyEntry
        WHERE Date BETWEEN '2022-01-01' AND '2022-12-31'
        GROUP BY ID_DEPT
    ),
    Montante2023 AS (
        SELECT ID_DEPT, SUM(MONTANT) AS SomaMontante2023
        FROM DailyEntry
        WHERE Date BETWEEN '2023-01-01' AND '2023-12-31'
        GROUP BY ID_DEPT
    )
    
    SELECT 
        m2022.ID_DEPT,
        COALESCE(m2023.SomaMontante2023, 0) - COALESCE(m2022.SomaMontante2022, 0) AS Diff
    FROM 
        Montante2022 m2022
    LEFT JOIN 
        Montante2023 m2023 ON m2022.ID_DEPT = m2023.ID_DEPT
    
    UNION
    
    SELECT 
        m2023.ID_DEPT,
        COALESCE(m2023.SomaMontante2023, 0) - COALESCE(m2022.SomaMontante2022, 0) AS Diff
    FROM 
        Montante2023 m2023
    LEFT JOIN 
        Montante2022 m2022 ON m2023.ID_DEPT = m2022.ID_DEPT
    WHERE 
        m2022.ID_DEPT IS NULL;
    

;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sum2022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-01-01' AND '2022-12-31';

;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sum2023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-01-01' AND '2023-12-31';

;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumQ12022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-01-01' AND '2022-03-31';
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumQ22022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-04-01' AND '2022-06-30';
; 
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumQ32022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-07-01' AND '2022-09-30';
; 
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumQ42022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-10-01' AND '2022-12-31'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumQ12023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-01-01' AND '2023-03-31'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumQ22023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-04-01' AND '2023-06-30'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumQ32023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-07-01' AND '2023-09-30'
; 
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumQ42023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-10-01' AND '2023-12-31'
; 
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM12022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-01-01' AND '2022-01-31' 
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM22022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-02-01' AND '2022-02-28'  
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM32022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-03-01' AND '2022-03-31'  
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM42022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-04-01' AND '2022-04-30'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM52022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-05-01' AND '2022-05-31' 
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM62022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-06-01' AND '2022-06-30'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM72022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-07-01' AND '2022-07-31'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});


router.get('/sumM82022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-08-01' AND '2022-08-31'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM92022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-09-01' AND '2022-09-30'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM102022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-10-01' AND '2022-10-31'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM112022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-11-01' AND '2022-11-30'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM122022', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-12-01' AND '2022-12-31'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM12023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-01-01' AND '2023-01-31'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM22023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-02-01' AND '2023-02-28'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM32023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-03-01' AND '2023-03-31'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM42023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-04-01' AND '2023-04-30'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM52023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-05-01' AND '2023-05-31'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM62023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-06-01' AND '2023-06-30'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM72023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-07-01' AND '2023-07-31'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM82023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-08-01' AND '2023-08-31'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM92023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-09-01' AND '2023-09-30'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM102023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-10-01' AND '2023-10-31'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM112023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-11-01' AND '2023-11-30'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/sumM122023', (req, res) => {
    const query2022 = `
    SELECT 
    SUM(MONTANT) AS Total
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-12-01' AND '2023-12-31'
;
    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/2022', (req, res) => {
    const query2022 = `
    SELECT 
    ID_DEPT, 
    SUM(MONTANT) AS Totalization
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2022-01-01' AND '2022-12-31'
GROUP BY 
    ID_DEPT;

    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

router.get('/2023', (req, res) => {
    const query2022 = `
    SELECT 
    ID_DEPT, 
    SUM(MONTANT) AS Totalization
FROM 
    DailyEntry
WHERE 
    Date BETWEEN '2023-01-01' AND '2023-12-31'
GROUP BY 
    ID_DEPT;

    `;

    pool.query(query2022, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query.');
            return;
        }

        res.json(results);
    });
});

module.exports = router;
