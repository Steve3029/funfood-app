import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FieldArray } from 'formik';
import { TextField, IconButton, Fab, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DragIndicator from '@material-ui/icons/DragIndicator';
import AddIcon from '@material-ui/icons/Add';
import withDnD from './withDnD';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  gridWrap: {
    flexWrap: "nowrap",
  },
  fab: {
    marginTop: 2 * theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  dndMask: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: "rgba(0,0,0,0)",
  },
});

class RecipeIngredientsFormFragment extends Component {
  static propTypes = {

  };

  render() {
    const {
      classes,
      values,
      handleMouseDown,
      getDraggingStyle,
      handleMouseUp,
      handleMouseMove,
      handleChange,
      handleBlur
    } = this.props;

    return (
      <div>
        <FieldArray
          name="ingredients"
          render={arrayHelpers => (
            <div>
              {values.ingredients && values.ingredients.length > 0 ? (
                values.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    style={getDraggingStyle(index)}
                    className={classes.root}
                  >
                    <Grid container spacing={8}>
                      <Grid item xs={5}>
                        <TextField
                          id={`ingredients[${index}].name`}
                          value={ingredient.name}
                          label="Ingredient"
                          name={`ingredients[${index}].name`}
                          type="text"
                          required
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          id={`ingredients[${index}].quantity`}
                          value={ingredient.quantity}
                          label="Quantity"
                          name={`ingredients[${index}].quantity`}
                          type="text"
                          required
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Quantity"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          aria-label="Delete"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="Drag"
                          onMouseDown={evt => handleMouseDown(evt, index)}
                        >
                          <DragIndicator />
                        </IconButton>
                      </Grid>
                    </Grid>
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
        {this.props.isDragging && (
          <div
            className={classes.dndMask}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(withDnD(RecipeIngredientsFormFragment, "ingredients"));