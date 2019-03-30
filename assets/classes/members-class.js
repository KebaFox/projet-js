let db, config

// Le require() envoie une fonction envoyant la class Members
// Permettant de définir des constantes dans le module venant du fichier principal
module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Members
}

let Members = class {

    // Envoie un membre via son ID
    static getByID(id) {

        return new Promise((next) => {

            db.query('SELECT * FROM members WHERE id = ?', [id])
                .then((result) => {
                    if (result[0] != undefined)
                        next(result[0])
                    else
                        next(new Error(config.errors.wrongID))
                })
                .catch((err) => next(err))

        })

    }

    // Envoie tous les membres (avec un maximum optionnel)
    static getAll(max) {

        return new Promise((next) => {

            if (max != undefined && max > 0) {
                db.query('SELECT * FROM members LIMIT 0, ?', [parseInt(max)])
                    .then((result) => next(result))
                    .catch((err) => next(err))
            } else if (max != undefined) {
                next(new Error('Wrong max value'))
            } else {
                db.query('SELECT * FROM members')
                    .then((result) => next(result))
                    .catch((err) => next(err))

            }
        })

    }

    // Ajoute un membre avec son nom comme paramètre
    static add(nom) {

        return new Promise((next) => {

            if (nom != undefined && nom.trim() != '') {

                nom = nom.trim()

                db.query('SELECT * FROM members WHERE nom = ?', [nom])
                    .then((result) => {
                        if (result[0] != undefined) {
                            next(new Error(config.errors.nomAlreadyTaken))
                        } else {
                            return db.query('INSERT INTO members(nom) VALUES(?)', [nom])
                        }
                    })
                    .then(() => {
                        return db.query('SELECT * FROM members WHERE nom = ?', [nom])
                    })
                    .then((result) => {
                        next({
                            id: result[0].id,
                            nom: result[0].nom
                        })
                    })
                    .catch((err) => next(err))

            } else {
                next(new Error(config.errors.noNomValue))
            }

        })

    }

    // Modifie le nom d'un membre via son ID
    static update(id, nom) {

        return new Promise((next) => {

            if (nom != undefined && nom.trim() != '') {

                nom = nom.trim()

                db.query('SELECT * FROM members WHERE id = ?', [id])
                    .then((result) => {
                        if (result[0] != undefined) {
                            return db.query('SELECT * FROM members WHERE nom = ? AND id != ?', [nom, id])
                        } else {
                            next(new Error(config.errors.wrongID))
                        }
                    })
                    .then((result) => {
                        if (result[0] != undefined) {
                            next(new Error(config.errors.sameNom))
                        } else {
                            return db.query('UPDATE members SET nom = ? WHERE id = ?', [nom, id])
                        }
                    })
                    .then(() => next(true))
                    .catch((err) => next(err))

            } else {
                next(new Error(config.errors.noNomValue))
            }

        })

    }

    // Supprime un membre via son ID
    static delete(id) {

        return new Promise((next) => {

            db.query('SELECT * FROM members WHERE id = ?', [id])
                .then((result) => {
                    if (result[0] != undefined) {
                        return db.query('DELETE FROM members WHERE id = ?', [id])
                    } else {
                        next(new Error(config.errors.wrongID))
                    }
                })
                .then(() => next(true))
                .catch((err) => next(err))

        })

    }

}