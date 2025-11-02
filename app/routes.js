const express = require('express');
const router = express.Router();//isolated mini router for modules

const Entry = require('./models/Entry');
const User = require('./models/User');

router.get('/', async (req, res) => {
    res.render('index'); //no extension
});

//display all entries
router.get('/entries', async (req, res) => {
    const userId = req.session.userId;
    if (!userId)
        res.redirect('/');
    else {
        const entries = await Entry.find({}).populate('author', 'name').sort({ dateOfCreation: -1 });
        const user = await User.findById(userId);
        const users = await User.find({}).populate('name');
        res.render('journal', { entries, user, users, userId });
    }
})

//get single entry
router.get('/entries/:id', async (req, res) => {
    const userId = req.session.userId;
    if (!userId)
        res.redirect('/');
    else {
        const entry = await Entry.findById(req.params.id);
        res.json({ entry });
    }

})

//Create an entry
router.post('/entries', async (req, res) => {
    //check if entry exist using dataset-id on form
    //  if yes update
    const entryId = req.body.entryid; // id somehow????
    if (entryId)
        await Entry.findByIdAndUpdate(entryId, {
            title: req.body.title,
            content: req.body.entry,
            dateOfCreation: new Date()
        });
    else
        // if not create
        await Entry.create({
            title: req.body.title,
            author: req.session.userId,
            content: req.body.entry,
            dateOfCreation: new Date()
        });
    res.redirect('/entries');
});

// //Update card's status
// router.put('/card', async (req, res) => {
//     const card = await Card.findByIdAndUpdate(
//         req.body.cardId,
//         { status: req.body.status.toLowerCase() },
//         { new: true }
//     );
//     res.json({ card });
// });

//Delete entry
router.delete('/entries', async (req, res) => {
    const entry = await Entry.findByIdAndDelete(
        req.body.entryId);
    res.json({ entry });
});

//Delete user
router.get('/unlink', async (req, res) => {
    const userId = req.session.userId;
    await Entry.deleteMany({ author: userId });
    await User.findByIdAndDelete(userId);
    req.session.destroy(e => {
        console.log('Could not logout');
        res.redirect('/');
    });
});


module.exports = router;