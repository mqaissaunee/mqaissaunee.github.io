const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/group_assignment', { useNewUrlParser: true, useUnifiedTopology: true });

const studentSchema = new mongoose.Schema({
    name: String,
    group: String
});

const Student = mongoose.model('Student', studentSchema);

app.post('/assign', async (req, res) => {
    const { name } = req.body;
    const groups = ['A', 'B', 'C'];
    const group = groups[Math.floor(Math.random() * groups.length)];
    
    const student = new Student({ name, group });
    await student.save();
    
    res.send(student);
});

app.get('/groups', async (req, res) => {
    const students = await Student.find();
    res.send(students);
});

app.listen(3000, () => console.log('Server started on port 3000'));
