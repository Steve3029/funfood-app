import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FieldArray, getIn } from 'formik';
import { TextField, IconButton, Fab, Grid, FormHelperText } from '@material-ui/core';
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
  errorContainer: {
    backgroundColor: theme.palette.error.dark,
    borderRadius: 3,
  },
  errorMsg: {
    marginBottom: theme.spacing.unit * 2,
    fontSize: 20,
    padding: 7,
    color: theme.palette.getContrastText(theme.palette.error.dark),
  }
});

class RecipeIngredientsFormFragment extends Component {
  static propTypes = {

  };

  getErrorMsg = (errors, touched, name) => {
    const error = getIn(errors, name);
    const touch = getIn(touched, name);
    return touch && error ? error : null;
  };

  hasError = (errors, touched, name) => {
    const error = getIn(errors, name);
    const touch = getIn(touched, name);
    return touch && error ? true : false;
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
      handleBlur,
      errors,
      touched,
    } = this.props;

    const ingredientsError = typeof errors.ingredients === 'string'
      ? errors.ingredients
      : null;

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
                          helperText={this.getErrorMsg(errors, touched, `ingredients[${index}].name`)}
                          error={this.hasError(errors, touched, `ingredients[${index}].name`)}
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
                          helperText={this.getErrorMsg(errors, touched, `ingredients[${index}].quantity`)}
                          error={this.hasError(errors, touched, `ingredients[${index}].quantity`)}
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
                  <div>
                    <h3>There is not any ingredient yet. Press below button to add one.</h3>
                    {ingredientsError
                      &&
                      (<div className={classes.errorContainer}>
                        <FormHelperText
                          id="ingredients-error"
                          variant="filled"
                          margin="dense"
                          className={classes.errorMsg}
                        >
                          {ingredientsError}
                        </FormHelperText>
                      </div>)
                    }
                  </div>
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