import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FieldArray } from 'formik';
import {TextField, IconButton, Fab } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DragIndicator from '@material-ui/icons/DragIndicator';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
    marginTop: 2 * theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

class RecipeIngredientsFormFragment extends Component {
  static propTypes = {

  };

  render() {
    const { classes, values, handleChange, handleBlur } = this.props;
    return (
      <div>
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
                onClick={() => arrayHelpers.push({ name: '', quantity: '' })}
              >
                <AddIcon />
              </Fab>

            </div>
          )}
        />
      </div>
    );
  }
}

export default withStyles(styles)(RecipeIngredientsFormFragment)