import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Formik, FieldArray, Field } from 'formik';
import { Button, Grid, TextField, MenuItem, IconButton, Fab } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DragIndicator from '@material-ui/icons/DragIndicator';
import AddIcon from '@material-ui/icons/Add';
import UploadImages from './UploadImages';

const styles = theme => ({
  selectEls: {
    display: "flex",
    flexDirection: "column",
  },
  margin: {
    margin: theme.spacing.unit,
  },
  fieldMargin: {
    marginBottom: theme.spacing.unit * 4,
  },
  buttonPosition: {
    width: "50%",
    textAlign: "right",
    marginLeft: "50%",
    marginTop: theme.spacing.unit * 3,
  },
  selectField: {
    width: "50%",
    textAlign: "left",
  },
  fab: {
    marginTop: 2 * theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

const categoryRange = [
  {
    value: "category 1",
    label: "category 1",
  },
  {
    value: "category 2",
    label: "category 2",
  },
  {
    value: "category 3",
    label: "category 3",
  }
]

class EditRecipe extends Component {
  static propTypes = {
    // handleSubmit: PropTypes.func.isRequired,
    // initialValues: PropTypes.object,
  };

  renderIngredients = (formikProps, classes) => {
    const { values, handleBlur, handleChange } = formikProps;
    return (
      <FieldArray 
        name="ingredients" 
        render={arrayHelpers => (
          <div>
            {values.ingredients && values.ingredients.length > 0 ? (
              values.ingredients.map((ingredient, index) => (
                <div key={index}>
                  <TextField 
                    id={`ingredients[${index}].name`}
                    value={ingredient.name} 
                    label="Ingredient" 
                    name={`ingredients[${index}].name`} 
                    type="text" 
                    required 
                    margin="normal" 
                    variant="outlined" 
                    placeholder="Name"
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                  />
                  <TextField 
                    id={`ingredients[${index}].quantity`}
                    value={ingredient.quantity} 
                    label="Quantity" 
                    name={`ingredients[${index}].quantity`} 
                    type="text" 
                    required 
                    margin="normal" 
                    variant="outlined" 
                    placeholder="Quantity"
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                  />
                  <IconButton 
                    aria-label="Delete" 
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton 
                    aria-label="Delete" 
                  >
                    <DragIndicator />
                  </IconButton>
                </div>
              ))
            ) : (
              <h3>There is not any ingredient yet. Press below button to add one.</h3>
            )}
            <Fab 
              color="primary" 
              aria-label="Add" 
              className={classes.fab} 
              onClick={() => arrayHelpers.push({name: '', quantity: ''})} 
            >
              <AddIcon />
            </Fab>
            
          </div>
        )}
      />
    );
  };

  renderForm = (formikProps, classes) => {
    return (
      <Grid 
        container 
        spacing={8} 
        alignItems="center" 
        justify="center" 
      >
        <Grid item xs={6}>
          <form>
            {/* {initialValues && <title>{initialValues.title}</title>} */}
            <div className={classNames(classes.buttonPosition, classes.fieldMargin)}>
              <Button 
                variant="contained" 
                size="large" 
                color="primary" 
                className={classes.margin}
              >
                Create
              </Button>
              <Button 
                variant="contained" 
                size="large" 
                color="secondary" 
                className={classes.buttonMargin}
              >
                Cancel
              </Button>
            </div>
            <div>
              <TextField 
                id="title" 
                label="Title" 
                name="title"
                type="text" 
                margin="normal" 
                fullWidth 
                required 
                variant="outlined" 
                placeholder="Enter a title here for new recipe"
                className={classes.fieldMargin} 
              />
              <TextField 
                id="subtitle" 
                label="Subtitle" 
                name="subtitle"
                type="text" 
                fullWidth 
                required 
                margin="normal" 
                variant="outlined" 
                placeholder="Enter a subtitle here like 'with onien and wine'"
                className={classes.fieldMargin} 
              />
              <div className={classes.selectEls}>
              <TextField 
                id="catetory"
                select
                className={classNames(classes.selectField, classes.fieldMargin)}
                variant="outlined"
                label="choose catetory"
                value="category 1"
              >
                {categoryRange.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField 
                id="serve"
                select
                className={classNames(classes.selectField, classes.fieldMargin)}
                variant="outlined"
                label="choose catetory"
                value="category 1"
              >
                {categoryRange.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              </div>
              <TextField
                id="description"
                label="Description"
                multiline 
                fullWidth 
                required 
                rows="4"
                rowsMax="4"
                className={classes.fieldMargin}
                margin="normal"
                variant="outlined"
              />
              <UploadImages />
              {this.renderIngredients(formikProps, classes)}
            </div>
          </form>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { classes, handleSubmit, initialValues } = this.props;
    return (
      <div className={classes.root}>
        <Formik 
          onSubmit={handleSubmit}  
          render={(formikProps) => this.renderForm(formikProps, classes)}
        />
      </div>
    );
  }
}

export default withStyles(styles)(EditRecipe);