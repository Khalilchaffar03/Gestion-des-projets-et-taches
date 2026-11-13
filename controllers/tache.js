// lahna aamelna l importation mtaa model tache bch najmou nesta3mlouh
const Tache = require('../models/tache');
const Projet = require('../models/projet');
const User = require('../models/user');

// fonction tthabbat ken el user ynajem yousel lel tache
const peutAcceder = async (tache, user) => {
    // el manager ynajem yousel l kol chy
    if (user.role === 'manager') return true;

    // Ken el user howa eli t3ayen lel tache (utilisateur assigné)
    if (tache.utilisateurAssocie && String(tache.utilisateurAssocie) === String(user._id)) {
        return true;
    }

    // Ken el user howa sa7b el projet
    const projet = await Projet.findById(tache.projetAssocie);
    if (projet && String(projet.proprietaire) === String(user._id)) {
        return true;
    }

    return false;
};

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
     try {
        // Nakhthou l'id mtaa tache mel URL
        const id = req.params.id;

        // Nlawjou 3al tache fil MongoDB
        const tache = await Tache.findById(id);

        // Ken tache mech mawjouda
        if (!tache) {
            return res.status(404).json({
                message: "Tâche introuvable"
            });
        }

        // Nthabtou eli l'utilisateur 3andou el droit ychouf el tache
        if (!(await peutAcceder(tache, req.user))) {
            return res.status(403).json({
                message: "Vous n'avez pas le droit d'accéder à cette tâche"
            });
        }

        return res.status(200).json({
            message: "Tâche trouvée avec succès",
            tache
        });

    } catch (error) {
        // ken l'id ghalet (mech format mtaa mongodb)
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Id invalide" });
        }
        return res.status(500).json({
            message: "Erreur lors de la recherche de la tâche",
            error: error.message
        });
    }

}

// lahna bch nasn3ou feature njibou biha les taches kol
const list = async (req, res) => {
  try {
        // Njibou les taches lkol mel MongoDB w n7ottouhom fi variable taches
        let taches = await Tache.find();

        // Nthabtou men role mta3 l'utilisateur connecté
        // Ken howa manager, ynajem ychouf les taches lkol
        // Ama ken user 3adi, lezem n'affichiw ken les taches eli 3andou el 7a9 ychoufhom
        if (req.user.role !== 'manager') {

            // Na3mlou tableau feragh bch n7ottou fih les taches eli user ynajem youselhom
            let resultat = [];

            // N3addiw 3la kol tache wa7da wa7da
            for (let tache of taches) {

                // Nesta3mlou fonction peutAcceder bch nthabtou ken l'utilisateur
                // 3andou el 7a9 ychouf el tache hedhi wala le
                if (await peutAcceder(tache, req.user)) {

                    // Ken fonction traja3 true, nzidou el tache lel tableau resultat
                    resultat.push(tache);
                }
            }

            // N3awdhou liste taches bel resultat eli fih ken les taches autorisées
            taches = resultat;
        }

        // Nthabtou ken l'utilisateur 3mal recherche bel statut
        if (req.query.statut) {

            // N5alliou ken les taches eli statut mte3hom ysewi el statut eli talabou l'utilisateur
            taches = taches.filter(t => t.statut === req.query.statut);
        }

        // Nthabtou ken l'utilisateur 7at kelma bech yalwej 3liha fi titre mta3 tache
        if (req.query.search) {

            // filter traja3 tableau jdida fih ken les taches eli titre mte3hom fih el kelma matlouba
            // toLowerCase t5alli el recherche ma tfarra9ch bin majuscule w minuscule
            // includes tthabet ken el kelma mawjouda fi titre wala le
            taches = taches.filter(t =>
                t.titre.toLowerCase().includes(req.query.search.toLowerCase())
            );
        }

        // Nthabtou ken l'utilisateur 7ab yratteb les taches 7asb deadline
        if (req.query.sort === 'deadline') {

            // sort trateb les taches 7asb deadline men el a9reb lel ab3ed
            taches.sort((a, b) => {

                // Ken el tache loula ma 3andhech deadline, n7ottouha lel e5er
                if (!a.deadline) return 1;

                // Ken el tache thenya ma 3andhech deadline, zeda n7ottouha lel e5er
                if (!b.deadline) return -1;

                // N9arnou bin les deux deadlines bch na3rfou anehom a9reb
                return new Date(a.deadline) - new Date(b.deadline);
            });
        }

        // Nthabtou ken l'utilisateur 7ab yratteb les taches 7asb titre
        if (req.query.sort === 'titre') {

            // localeCompare trateb les titres par ordre alphabetique
            taches.sort((a, b) => a.titre.localeCompare(b.titre));
        }

        // Ken kol chy mche bel behi, Nraj3ou resultat lel utilisateur b status 200
        // taches tnajem tkoun fiha barcha taches wala tableau feragh
        return res.status(200).json({
            message: "Liste des tâches récupérée avec succès",
            taches
        });

    } catch (error) {

        // Ken sar erreur pendant l'execution, nraj3ou status 500 m3a message mta3 erreur
        return res.status(500).json({
            message: "Erreur lors de la récupération des tâches",
            error: error.message
        });
    }

}

// lahna bch nfaskhou tache bil id 
const deleteTache = async (req, res) => {
   try {
        // nakhdhou l'id mtaa tache mel URL (exemple: /tache/delete/123)
        // nlawjou 3al tache fil base, ken ma l9ineehech ywalli tache = null
        const tache = await Tache.findById(req.params.id);

        // ken tache mech mawjouda, nraj3ou 404 w nwa99fou houni
        if (!tache) {
            return res.status(404).json({ message: "Tâche introuvable" });
        }

        // nthabtou eli el user 3andou el droit yfaskh el tache
        // (ya3ni howa manager, wala sa7b el projet, wala el tache assign lih)
        // ken ma 3andouch el droit, nraj3ou 403 
        if (!(await peutAcceder(tache, req.user))) {
            return res.status(403).json({ message: "Vous n'avez pas le droit de supprimer cette tâche" });
        }

        // kol chay s7i7, donc nfaskhou el tache mel base
        await Tache.findByIdAndDelete(req.params.id);

        // nraj3ou 200 bech n3arfou eli el fas5 sar 
        return res.status(200).json({ message: "Tâche supprimée avec succès" });

    } catch (error) {
        // ken sar ay erreur ghalta (par exemple id mech format mongodb, wala problème fil base)
        return res.status(500).json({
            message: "Erreur lors de la suppression de la tâche",
            error: error.message
        });
    }
}   

// lahna bch nbadlou fi tache bil id mteeha 
const update = async (req, res) => {
    try {
        // nakhdhou el données eli jew mel body (par exemple: { "statut": "doing" })
        // utilisateurAssocie mouch houni: el affectation lel manager bark fi route assign
        const { titre, description, statut, deadline } = req.body;

        // nlawjou 3al tache fil base bil id eli fil URL
        const tache = await Tache.findById(req.params.id);

        // ken tache mech mawjouda, nraj3ou 404
        if (!tache) {
            return res.status(404).json(
                { message: "Tâche introuvable" });
        }

        // nthabtou eli el user 3andou el droit ybaddel el tache
        // (manager, wala sa7b el projet, wala el manager aamel lha assign lih)
        // ken la, nraj3ou 403 
        if (!(await peutAcceder(tache, req.user))) {
            return res.status(403).json(
                { message: "Vous n'avez pas le droit de modifier cette tâche" });
        }

        // nbadlou ken les champs eli jewna fil body, w eli ma jewch yebqaw kif ma houma
        if (titre) tache.titre = titre;
        if (description) tache.description = description;
        if (statut) tache.statut = statut;
        if (deadline) tache.deadline = deadline;

        // save ysir automatiquement mel statut (lezem to do wala doing wala done)
        // ken statut ghalet, ytal3 erreur w yet7at fil catch
        await tache.save();

        // nraj3ou el tache ba3d ma tbaddlet
        return res.status(200).json({
            message: "Tâche modifiée avec succès",
            tache
        });

    } catch (error) {
        // ken sar ay erreur (statut ghalet, id mech s7i7, problème fil base...)
        return res.status(500).json({
            message: "Erreur lors de la modification de la tâche",
            error: error.message
        });
    }

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