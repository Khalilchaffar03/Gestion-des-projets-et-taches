// lahna aamelna l importation mtaa model projet bch najmou nesta3mlouh
const Projet = require("../models/projet");
// lahna aamelna l importation mtaa model Tache bch najmou nesta3mlouh
const Tache = require("../models/tache");
// fonction tchouf ken el user howa sa7b el projet wala manager
const estProprietaireOuManager = (projet, user) => {
  return (
    user.role === "manager" || String(projet.proprietaire) === String(user._id)
  );
};

// lahne bch nasn3ou feature creation projet
const create = async (req, res) => {
  try {
    // houni nekhdhou les données eli bathahom l user bil body mte3 request
    const { nom, description, proprietaire, statut } = req.body;

    // houni nthabtou ili esm projet mawjoud
    if (!nom) {
      return res.status(400).json({
        message: "nom est obligatoire",
      });
    }

    // houni nthabtou ili utilisateur connecté w mawjoud
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: "Utilisateur non authentifié",
      });
    }

    // houni nasn3ou projet jdid w norbtouh bil utlisateur connecté
    const nouvPorjet = new Projet({
      nom,
      description,
      proprietaire: req.user._id, // houni n7otou id mte3 utilisateur connecté
      statut,
    });

    await nouvPorjet.save(); // houni n7awlou projet l base de données

    // Nraj3ou réponse lel utilisateur eli 3mal l request
    return res.status(201).json({
      message: "Projet créé avec succès",
      projet: nouvPorjet,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Fama erreur fi creation mtaa projet",
      error: error.message,
    });
  }
};

// lahna bch nasn3ou feature bch njibou bih projet bil id mte3ou
const ById = async (req, res) => {
  try {
    // nkhthou l'id mtaa projet mel URL mte3 request
    const id = req.params.id;

    // nkawjou 3al projet fil MongoDB bch njibouh bil id mte3ou
    const projet = await Projet.findById(id);

    // ken projet mech mawjoud, nraj3ou message mtaa erreur
    if (!projet) {
      return res.status(404).json({
        message: "Projet non trouvé",
      });
    }

    // el user 3adi ychouf ken projet mte3ou, el manager ychouf el kol
    if (!estProprietaireOuManager(projet, req.user)) {
      return res.status(403).json({
        message: "Ce projet ne vous appartient pas",
      });
    }

    // ken l9ineh nrajouh lel utlisateur
    return res.status(200).json({
      message: "Projet trouve",
      projet: projet,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Fama erreur fi recherche mtaa projet",
      error: error.message,
    });
  }
};

// lahna bch nasn3ou feature bch njibou les projets lkol
const list = async (req, res) => {
  try {
    // el user 3adi ychouf projets mte3ou bark, el manager ychouf el kol
    const filtre = {};
    if (req.user.role !== "manager") {
      filtre.proprietaire = req.user._id;
    }

    const projets = await Projet.find(filtre);

    // Kenma fama hata projet
    if (projets.length === 0) {
      return res.status(404).json({
        message: "Aucun projet trouve",
      });
    }

    return res.status(200).json({
      message: "Liste des projets récupérée avec succès",
      projets,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Fama erreur fi recherche mtaa projets",
      error: error.message,
    });
  }
};

// lahna bch nasn3ou feature bch nfaskhou bih projet bil id mte3ou
const deleteProjet = async (req, res) => {
  try {
    const projet = await Projet.findById(req.params.id);

    // ken projet mech mawjoud
    if (!projet) {
      return res.status(404).json({
        message: "Projet non trouvé",
      });
    }

    // ken el user mouch sa7b el projet w mouch manager, mamnou3
    if (!estProprietaireOuManager(projet, req.user)) {
      return res.status(403).json({
        message: "Ce projet ne vous appartient pas",
      });
    }

    // nfaskhou el taches mta3 el projet 9bal (bech ma yبqaw taches bidoun projet)
    await Tache.deleteMany({ projetAssocie: projet._id });
    await Projet.findByIdAndDelete(projet._id);

    return res.status(200).json({
      message: "Projet supprimé avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Fama erreur fi suppression mtaa projet",
      error: error.message,
    });
  }
};

// lahna bch nasn3ou feature bch nbadel bih projet bil id mte3ou
// Lahna bch nbaddlou les informations mtaa projet
const update = async (req, res) => {
  try {
    // nakhthou les nouvelles données mel body
    const { nom, description, statut } = req.body;

    const projet = await Projet.findById(req.params.id);

    // ken projet mech mawjoud
    if (!projet) {
      return res.status(404).json({
        message: "Projet introuvable",
      });
    }

    // ken el user mouch sa7b el projet w mouch manager, mamnou3
    if (!estProprietaireOuManager(projet, req.user)) {
      return res.status(403).json({
        message: "Ce projet ne vous appartient pas",
      });
    }

    // nbadlou ken eli jewna fil body
    if (nom) projet.nom = nom;
    if (description) projet.description = description;
    if (statut) projet.statut = statut;

    // save ysir automatiquement mel enum mtaa statut
    await projet.save();

    return res.status(200).json({
      message: "Projet modifié avec succès",
      projet,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de la modification du projet",
      error: error.message,
    });
  }
};

module.exports = {
  create,
  ById,
  list,
  deleteProjet,
  update,
};
