const express = require('express');
const { formidable } = require('formidable');
const fs = require('fs');
const sharp = require('sharp');
const User = require('../models/user');
const auth = require('../middleware/auth');
//const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        //sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        //sendCancelationEmail(req.user.email, req.user.name);
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
});

// Replaced multer with formidable for avatar upload
// router.post('/users/me/avatar', auth, (req, res) => {
//     const form = formidable({
//         maxFileSize: 1 * 1024 * 1024,
//         multiples: false,
//         filter: ({ mimetype }) => mimetype && ['image/jpeg', 'image/png', 'image/jpg'].includes(mimetype)
//     });

//     form.parse(req, (err, fields, files) => {
//         (async () => {
//             if (err) return res.status(400).send({ error: 'Invalid file type or size exceeded 1MB' });

//             const file = files.avatar;
//             if (!file) return res.status(400).send({ error: 'Avatar file is required' });

//             try {
//                 const buffer = await sharp(file.filepath)
//                     .resize({ width: 250, height: 250 })
//                     .png()
//                     .toBuffer();

//                 req.user.avatar = buffer;
//                 await req.user.save();
//                 res.send();
//             } catch (e) {
//                 res.status(500).send({ error: 'Failed to process avatar image' });
//             } finally {
//                 fs.unlink(file.filepath, () => {});
//             }
//         })();
//     });
// });

// router.delete('/users/me/avatar', auth, async (req, res) => {
//     req.user.avatar = undefined;
//     await req.user.save();
//     res.send();
// });

// router.get('/users/:id/avatar', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user || !user.avatar) {
//             throw new Error();
//         }

//         res.set('Content-Type', 'image/png');
//         res.send(user.avatar);
//     } catch (e) {
//         res.status(404).send();
//     }
// });

module.exports = router;
