
const Periode = require('../models/periode');

class PeriodeService {
    async findAll() {
        try {
            return await Periode.findAll();
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            return await Periode.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    async create(periodeData) {
        const { TypePeriode, DateDebut, Mois, Trimestre, Année } = periodeData;

        switch (TypePeriode) {
            case 'Dans la semaine':
                if (!DateDebut || Mois || Trimestre || !Année) {
                    throw new Error("Para TypePeriode 'semaine', apenas 'DateDebut' e 'Année' deve ser fornecido.");
                }
                break;

            case 'Mensuel':
                if (!Mois || !Année || DateDebut || Trimestre) {
                    throw new Error("Para TypePeriode 'mensuel', apenas 'Mois' e 'Année' devem ser fornecidos.");
                }
                break;

            case 'Trimestriel':
                if (!Trimestre || !Année || DateDebut || Mois) {
                    throw new Error("Para TypePeriode 'trimestriel', apenas 'Trimestre' e 'Année' devem ser fornecidos.");
                }
                break;

            case 'Annuelle':
                if (!Année || DateDebut || Mois || Trimestre) {
                    throw new Error("Para TypePeriode 'Anuel', apenas 'Année' deve ser fornecido.");
                }
                break;

            case 'Cumulative année':
                if (DateDebut || Mois || Trimestre || !Année) {
                    throw new Error("Para TypePeriode 'cum Année', apenas 'Année' deve ser fornecido.");
                }
                break;

            default:
                throw new Error("TypePeriode inválido.");
        }
        try {
            return await Periode.create(periodeData);
        } catch (error) {
            throw error;
        }
    }

    async updateById(id, data) {
        const periode = await Periode.findByPk(id);
        if (!periode) {
            return null;
        }
        await periode.update(data);
        return periode;
    }

    async deleteById(id) {
        const periode = await Periode.findByPk(id);
        if (!periode) {
            return null;
        }
        await periode.destroy();
        return true;
    }
}

module.exports = new PeriodeService();
