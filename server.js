const express = require('express');
const app = express();

const Task = require('./models/Task');
const mongoose = require('mongoose');

const mongoURI = require('./config/keys').mongoURI;
mongoose.connect(mongoURI)
    .then(res => console.log('mongoDB connected'))
    .catch(err => console.log(err))

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.json({limit:'1mb'}))

app.listen(8000);

app.get('/', (req, res) => {
    res.redirect('/active');
})

app.get('/active', async (req, res) => {
  try {
    let tasks = await Task.find({ done: false }).sort({ createdAt: -1 });
    console.log(tasks)
    res.render('index', { tasks, active: true });
  } catch (err) {
    res.render('index', { tasks: [], active: true });
  }
})

app.get('/done', async (req, res) => {
    try {
        let tasks = await Task.find({ done: true }).sort({ createdAt: 1 });
        res.render('index', { tasks, active: false });
    } catch (e) {
        res.redirect('/active');
    }
})

app.post('/newtask', async (req, res) => {
    let taskBody = req.body.taskname;
    try {
        await Task.create({
            task: taskBody,
            done: false
        })
        res.redirect('/active');
    } catch (e) {
        res.redirect('/active');
    }
})

app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const state = '/' + req.body.state;
    try {
        await Task.findByIdAndDelete(id);
        return res.json({ redirect: state });
    } catch (e) {
        console.log(e)
    }
})

app.put('/:id', async (req, res) => {
    let id = req.params.id;
    const state = '/' + req.body.state;

    try {
        let task = await Task.findById(id);
        task.done = !task.done;
        await task.save();
        console.log(`done, now redirect to ${state}`, task.done, req.body)
        return res.json({ redirect: state });
    } catch (e) {
        console.log(e)
    }
})