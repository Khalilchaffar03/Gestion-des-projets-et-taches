// lahna aamelna l importation mtaa model tache bch najmou nesta3mlouh
const Tache = require('../models/tache');
const Projet = require('../models/projet');
const User = require('../models/user');

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
        if (!req.user || !req.user._id) {
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
  try {
        // Nakhthou l'id mtaa projet mel URL
        const projetId = req.params.projetId;

        // Nlawjou 3al projet fil MongoDB
        const projet = await Projet.findById(projetId);

        // Ken projet mech mawjoud
        if (!projet) {
            return res.status(404).json({
                message: "Projet non trouvé"
            });
        }

        // el user 3adi ychouf ken taches projets mte3ou, el manager ychouf el kol
        if (req.user.role !== 'manager' && String(projet.proprietaire) !== String(req.user._id)) {
            return res.status(403).json({
                message: "Ce projet ne vous appartient pas"
            });
        }

        // Njibou les taches eli marbouta bil projet hedha
        const taches = await Tache.find({
            projetAssocie: projetId
        });

        // Ken ma fama hata tache (mouch erreur, nraj3ou liste fer8a 5ater ady porjet mech fih tache , yabda porjet jdida)
        if (taches.length === 0) {
            return res.status(200).json({
                message: "Aucune tâche trouvée pour ce projet",
                taches: []
            });
        }

        // Nraj3ou les taches
        return res.status(200).json({
            message: "Liste des tâches du projet récupérée avec succès",
            taches
        });

    } catch (error) {
        // ken l'id ghalet (mech format mtaa mongodb)
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: "Id invalide"
            });
        }

        return res.status(500).json({
            message: "Erreur lors de la récupération des tâches",
            error: error.message
        });
    }
};

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


const assign = async (req, res) => {

};


module.exports = {
    create,
    ByprojetId,
    ById,
    list,
    deleteTache,
    update,
    assign
}   