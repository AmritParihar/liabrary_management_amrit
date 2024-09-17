const Student = require('../Model/Student');

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching students', error: err.message });
    }
};


// Create a new student
const createStudent = async (req, res) => {
    const { name, email } = req.body;
    try {
        console.log("req.body-==->>>",req.body)
        const newStudent = await Student.create({ name, email });
        console.log("newstudent",newStudent)
        res.status(201).json(newStudent);
    } catch (err) {
        
        res.status(500).json({ message: 'Error creating student', error: err.message });
    }
};

// Update a student by ID
const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const [updated] = await Student.update({ name, email }, { where: { id } });
        if (updated) {
            const updatedStudent = await Student.findByPk(id);
            res.status(200).json(updatedStudent);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating student', error: err.message });
    }
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Student.destroy({ where: { id } });
        if (deleted) {
            res.status(204).json({ message: 'Student deleted successfully' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting student', error: err.message });
    }
};

module.exports = { getAllStudents, createStudent, updateStudent, deleteStudent };
