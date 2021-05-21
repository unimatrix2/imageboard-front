import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Typography, Checkbox, FormControlLabel } from '@material-ui/core';
import { useEffect, useState, useContext } from 'react';
import { Context } from '../context/Context';

export default function CreateBoard({ classes, ucs }) {
    const { state, dispatch } = useContext(Context);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const boardSchema = yup.object({
        abbr: yup
            .string()
            .trim()
            .matches(/[A-Za-z0-9]/, 'Only alphanumeric (A-Z any case and 0-9)')
            .min(1, 'Ain\'t you funny! Ha ha.')
            .max(10, 'Max 10 characters allowed')
            .required('Required'),
        title: yup
            .string()
            .trim()
            .min(3, 'Give it a little effort, you just did the acronym!')
            .max(40, 'C\'mon, the description goes below')
            .matches(/[^.$]/, 'No questions or periods')
            .required('Required'),
        description: yup
            .string()
            .trim()
            .min(10, 'Give us a good reason this board should exist')
            .max(400, 'C\'mon, it\'s a brief description!')
            .matches(/[^.$]/, 'No questions or periods')
            .required('Required'),
        rules: yup
            .string()
            .trim(),
        secret: yup
            .string()
            .trim()
            .min(8, 'Must be a decent password')
            .max(40, 'Don\'t overdo it')
            .matches(/[^.$]/, 'No ? or "."')
            .required('Required'),
		sfw: yup
			.boolean()
			.required(),
    });

	useEffect(() => {
		if (user) {
			dispatch({
				type: 'PROVIDE_USER',
				payload: user
			});
		}
	}, [user]);

	const formik = useFormik({
		initialValues: {
			abbr: '',
			title: '',
			description: '',
			rules: '',
			secret: '',
			sfw: false
		},
		validationSchema: boardSchema,
		onSubmit: async (values, helpers) => {
			console.log(values)
		}
	});

	return (
		<Container maxWidth="sm">
			<form onSubmit={formik.handleSubmit} className={classes.formContainer}>
			<Typography variant="h5" align="center" className={classes.formTitle}>Create Board</Typography>
				<TextField 
					required
					fullWidth
					variant="outlined"
					label="Abbreviated name for the URL"
					name="abbr"
					error={formik.touched.abbr && Boolean(formik.errors.abbr)}
					helperText={formik.touched.abbr && formik.errors.abbr}
					value={formik.values.abbr}
					onChange={formik.handleChange}
					className={classes.formField}
				/>
				<TextField 
					required
					fullWidth
					variant="outlined"
					label="Full title of the board"
					name="title"
					error={formik.touched.title && Boolean(formik.errors.title)}
					helperText={formik.touched.title && formik.errors.title}
					value={formik.values.title}
					onChange={formik.handleChange}
					className={classes.formField}
				/>
				<TextField 
					required
					fullWidth
					variant="outlined"
					label="Brief description of the board"
					name="description"
					error={formik.touched.description && Boolean(formik.errors.description)}
					helperText={formik.touched.description && formik.errors.description}
					value={formik.values.description}
					onChange={formik.handleChange}
					className={classes.formField}
					multiline
					rows={4}
					rowsMax={8}
				/>
				<TextField 
					required
					fullWidth
					variant="outlined"
					label="Specific rules that apply to the board"
					name="rules"
					error={formik.touched.rules && Boolean(formik.errors.rules)}
					helperText={formik.touched.rules && formik.errors.rules}
					value={formik.values.rules}
					onChange={formik.handleChange}
					className={classes.formField}
					multiline
					rows={4}
					rowsMax={8}
				/>
				<TextField 
					required
					type="password"
					fullWidth
					variant="outlined"
					label="Your modmin secret"
					name="secret"
					error={formik.touched.secret && Boolean(formik.errors.secret)}
					helperText={formik.touched.secret && formik.errors.secret}
					value={formik.values.secret}
					onChange={formik.handleChange}
					className={classes.formField}
				/>
				<FormControlLabel
					className={classes.formField}
					control={
						<Checkbox
							name="sfw"
							error={formik.touched.sfw && formik.errors.sfw}
							checked={formik.values.sfw}
							onChange={formik.handleChange}
							color="primary"
						/>
					}
					label="Is the board Safe For Work?"
					labelPlacement="top"
				/>
				<Button type="submit" variant="contained" color="primary" onClick={() => formik.isSubmitting ? router.push('/') : null} className={classes.fab} >
					Create Board
				</Button>
			</form>
		</Container>
	)
}