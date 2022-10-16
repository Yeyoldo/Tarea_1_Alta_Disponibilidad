const { Router } = require('express');
const router = Router();
const pool = require("../../db");
const cors = require('cors');

router.get('/', (req, res) => {
    res.json({ "Title": "Bienvenido Heroe" });
})

router.get('/home', async (req, res) => {
    const data = await pool.query("Select * FROM heroes")
    res.json(data.rows);
})

router.post('/commit', async (req, res) => {
    const { idheroe } = req.body;
    const data = await pool.query("Select * FROM heroes where id_heroe=$1", [idheroe])
    res.json(data.rows);
})
router.post('/commit2', async (req, res) => {
    const { idheroe } = req.body;
    const data = await pool.query("SELECT c.id_comentario,u.usuario,c.comentario FROM usuarios AS u INNER JOIN comentarios as c ON u.id_usuario=c.id_user where c.id_heroe=$1", [idheroe])
    res.json(data.rows);
})

router.post('/agregar', async (req, res) => {
    const { idheroe, user, commit } = req.body;
    const data = await pool.query("INSERT INTO comentarios (id_user,id_heroe,comentario) VALUES ($1,$2,$3)", [user, idheroe, commit])
    res.json({
        status: 1
    });
})

router.delete('/eliminar', async (req, res) => {
    const { idcommit } = req.body;
    const data = await pool.query("DELETE FROM comentarios WHERE id_comentario=$1", [idcommit])
    res.json({
        status: 1
    });
})
router.put('/editar', async (req, res) => {
    const { idcommit, commit } = req.body;
    const data = await pool.query("UPDATE comentarios SET comentario=$1 WHERE id_comentario=$2 ", [commit, idcommit])
    res.json({
        status: 1
    });
})


router.post('/login', async (req, res) => {
    const { user, pass } = req.body;
    const getUser = await pool.query("SELECT id_usuario FROM usuarios where usuario = $1 AND clave = $2", [user, pass]);
    if (getUser.rows.length) {
        res.json({
            status: 1,
            token: getUser.rows[0].id_usuario
        })
        return
    } else {
        res.json({
            status: 0
        })
        return;
    }
});
module.exports = router;