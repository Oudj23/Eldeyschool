import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Paper, IconButton, TextField, Button, MenuItem, Typography, Box, Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import './Add_Student.css'
function Add_Student() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Nom_Prénom: '',
    Email: '',
    Classe: '',
    Téléphone: '',
    Password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('deyschooltoken');

    if (!token) {
      navigate('/connexion');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.Role !== 'admin') {
        navigate('/user/dashboard'); // Redirect students to their dashboard
      }
    } catch (error) {
      console.error('Invalid token');
      localStorage.removeItem('deyschooltoken');
      navigate('/connexion');
    }
  }, [navigate]);

  const classOptions = ['1AS', '2S', '2M', '2MT', '3S', '3M', '3MT'];
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchSearch = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/api/admin/search?name=${searchTerm}`);
          setStudents(res.data);
        } catch (err) {
          console.error('Erreur lors de la recherche:', err);
        }
      };

      if (searchTerm) {
        fetchSearch();
      } else {
        // Reload all if search is cleared
        const fetchStudents = async () => {
          const res = await axios.get('http://localhost:3000/api/admin/showstudents');
          setStudents(res.data);
        };
        fetchStudents();
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/admin/showstudents');
        setStudents(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des étudiants:', err);
      }
    };
    fetchStudents();
  }, []);

  const handleAddClick = () => {
    setShowForm(true);
    setFormData({
      Nom_Prénom: '',
      Email: '',
      Classe: '',
      Téléphone: '',
      Password: ''
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClassFilterChange = (e) => setSelectedClass(e.target.value);

  const handleEdit = (student) => {
    setFormData({
      Nom_Prénom: student.Nom_Prénom,
      Email: student.Email,
      Classe: student.Classe,
      Téléphone: student.Téléphone,
      Password: ''
    });
    setEditingId(student._id);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    const { Nom_Prénom, Email, Classe, Téléphone, Password } = formData;
    if (!Nom_Prénom || !Email || !Classe || !Téléphone) {
      alert('Tous les champs sauf mot de passe sont requis.');
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        const res = await axios.put(`http://localhost:3000/api/admin/update/${editingId}`, formData);
        setStudents((prev) =>
          prev.map((s) => (s._id === editingId ? res.data : s))
        );
      } else {
        const res = await axios.post('http://localhost:3000/api/admin/add', formData);
        setStudents((prev) => [...prev, res.data]);
      }
      setFormData({ Nom_Prénom: '', Email: '', Classe: '', Téléphone: '', Password: '' });
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      alert('Erreur: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/delete/${id}`);
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#121212', minHeight: '100vh' }}>
      <Typography variant="h5" color="#fff" gutterBottom>
        Liste des Étudiants
      </Typography>
      <input
        type="search"
        placeholder="Entrer le nom de l'étudiant"
        className="Student-name-serach"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Paper elevation={4} sx={{ borderRadius: 3, overflow: 'hidden', backgroundColor: '#1e1e1e' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#2c2c2c' }}>
              <TableCell sx={{ color: '#fff' }}>Nom & Prénom</TableCell>
              <TableCell sx={{ color: '#fff' }}>Email</TableCell>
              <TableCell sx={{ color: '#fff' }}>
                <TextField
                  select
                  value={selectedClass}
                  onChange={handleClassFilterChange}
                  size="small"
                  variant="outlined"
                  sx={{
                    width: 90,
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      backgroundColor: '#2a2a2a',
                      borderRadius: 1,
                      fontSize: '0.85rem',
                      paddingY: '2px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                    '& .MuiSvgIcon-root': { color: '#fff' },
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          backgroundColor: '#1f1f1f',
                          color: '#fff',
                          '& .MuiMenuItem-root': {
                            fontSize: '0.85rem',
                            '&:hover': { backgroundColor: '#333', color: '#00e676' },
                            '&.Mui-selected': { backgroundColor: '#555', color: '#00e676' },
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="">Toutes</MenuItem>
                  {classOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell sx={{ color: '#fff' }}>Téléphone</TableCell>
              <TableCell sx={{ color: '#fff' }}>Mot de passe</TableCell>
              <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
              <TableCell align="right" sx={{ color: '#fff' }}>
                <IconButton onClick={handleAddClick} sx={{ color: '#fff' }}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.filter((s) => !selectedClass || s.Classe === selectedClass).length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} sx={{ color: '#fff', textAlign: 'center', py: 3 }}>
                  {searchTerm
                    ? "Cet étudiant n'existe pas."
                    : "Aucun étudiant à afficher."}
                </TableCell>
              </TableRow>
            ) : (
              students
                .filter((s) => !selectedClass || s.Classe === selectedClass)
                .map((student) => (
                  <TableRow key={student._id} sx={{ '&:hover': { backgroundColor: '#2a2a2a' } }}>
                    <TableCell sx={{ color: '#eee' }}>{student.Nom_Prénom}</TableCell>
                    <TableCell sx={{ color: '#eee' }}>{student.Email}</TableCell>
                    <TableCell sx={{ color: '#eee' }}>{student.Classe}</TableCell>
                    <TableCell sx={{ color: '#eee' }}>{student.Téléphone}</TableCell>
                    <TableCell sx={{ color: '#eee' }}>••••••••</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton color="primary" onClick={() => handleEdit(student)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(student._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                ))
            )}


            {showForm && (
              <TableRow>
                <TableCell colSpan={7} sx={{ backgroundColor: '#121212', color: '#fff' }}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <TextField
                        name="Nom_Prénom"
                        placeholder="Nom & Prénom"
                        variant="outlined"
                        size="small"
                        value={formData.Nom_Prénom}
                        onChange={handleChange}
                        sx={{
                          backgroundColor: '#2a2a2a',
                          borderRadius: 1,
                          input: { color: '#fff' },
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                        }}
                      />
                      <TextField
                        name="Email"
                        placeholder="Email"
                        variant="outlined"
                        size="small"
                        value={formData.Email}
                        onChange={handleChange}
                        sx={{
                          backgroundColor: '#2a2a2a',
                          borderRadius: 1,
                          input: { color: '#fff' },
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                        }}
                      />
                      <TextField
                        select
                        name="Classe"
                        value={formData.Classe}
                        onChange={handleChange}
                        size="small"
                        variant="outlined"
                        sx={{
                          width: 120,
                          backgroundColor: '#2a2a2a',
                          borderRadius: 1,
                          '& .MuiOutlinedInput-root': {
                            color: '#fff',
                            paddingY: '2px',
                          },
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                          '& .MuiSvgIcon-root': { color: '#fff' },
                        }}
                        SelectProps={{
                          MenuProps: {
                            PaperProps: {
                              sx: {
                                backgroundColor: '#1f1f1f',
                                color: '#fff',
                                '& .MuiMenuItem-root': {
                                  fontSize: '0.85rem',
                                  '&:hover': { backgroundColor: '#333', color: '#00e676' },
                                  '&.Mui-selected': { backgroundColor: '#555', color: '#00e676' },
                                },
                              },
                            },
                          },
                        }}
                      >
                        {classOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        name="Téléphone"
                        placeholder="Téléphone"
                        variant="outlined"
                        size="small"
                        value={formData.Téléphone}
                        onChange={handleChange}
                        inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }}
                        sx={{
                          backgroundColor: '#2a2a2a',
                          borderRadius: 1,
                          input: { color: '#fff' },
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                        }}
                      />

                      <TextField
                        name="Password"
                        placeholder="Mot de passe"
                        type="password"
                        variant="outlined"
                        size="small"
                        value={formData.Password}
                        onChange={handleChange}
                        sx={{
                          backgroundColor: '#2a2a2a',
                          borderRadius: 1,
                          input: { color: '#fff' },
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
                        }}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                          backgroundColor: '#00e676',
                          color: '#000',
                          borderRadius: 2,
                          '&:hover': { backgroundColor: '#00c853' },
                        }}
                      >
                        {loading ? 'En cours...' : editingId ? 'Mettre à jour' : 'Enregistrer'}
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setShowForm(false)}
                        sx={{
                          color: '#fff',
                          borderColor: '#fff',
                          '&:hover': { backgroundColor: '#333' },
                        }}
                      >
                        Annuler
                      </Button>
                    </Stack>
                  </form>
                </TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
      </Paper>
    </Box >
  );
}

export default Add_Student;