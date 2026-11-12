// lahna aamelna l importation mtaa model tache bch najmou nesta3mlouh
const Tache = require('../models/tache');


// lahne bch nasn3ou feature creation tache
const create = async (req, res) => {
    try {

        // Nakhthou les données eli bathahom l'utilisateur mel body
        const { titre, description, statut, deadline, projetAssocie } = req.body;

        // Nthabtou eli titre obligatoire
        if (!titre) {
            return res.status(400).json({
                message: "Le titre est obligatoire"
            });
        }

        // Nthabtou eli utilisateur connecté w mawjoud
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Utilisateur non authentifié"
            });
        }

        // Nthabtou eli projetAssocie mawjoud
        if (!projetAssocie) {
            return res.status(400).json({
                message: "Le projet est obligatoire"
            });
        }

        // Nlawjou 3al projet fil MongoDB
        const projet = await Projet.findById(projetAssocie);

        if (!projet) {
            return res.status(404).json({
                message: "Projet non trouvé"
            });
        }

        // Nasn3ou tâche jdida w norbtouha bil projet w utilisateur connecté
        const nouvTache = new Tache({
            titre,
            description,
            statut,
            deadline,
            utilisateurAssocie: req.user.id,
            projetAssocie
        });

        // N7afdhoulha fil base de données
        await nouvTache.save();

        // Nraj3ou réponse lel utilisateur
        return res.status(201).json({
            message: "Tâche créée avec succès",
            tache: nouvTache
        });

    } catch (error) {

        return res.status(500).json({
            message: "Erreur lors de la création de la tâche",
            error: error.message
        });
    }

}

// lahna bch nasn3ou feature njibou biha tache bil id mtaa projet
const ByprojetId = async (req, res) => {

}

// lahna bch nasn3ou feature njibou biha tache bil id mteeha 
const ById = async (req, res) => {

}

// lahna bch nasn3ou feature njibou biha les taches kol
const list = async (req, res) => {

}

// lahna bch nfaskhou tache bil id 
const deleteTache = async (req, res) => {

}   

// lahna bch nbadlou fi tache bil id mteeha 
const update = async (req, res) => {

}

const Assign = async (req, res) => { 


}


module.exports = {
    create,
    ByprojetId,
    ById,
    list,
    deleteTache,
    update,
    Assign
}
