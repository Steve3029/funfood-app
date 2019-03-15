import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, IconButton, Fab, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DragIndicator from '@material-ui/icons/DragIndicator';
import withDnD from './withDnD';
import { FieldArray } from 'formik';
import UploadImages from './UploadImages';

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
  textFieldMargin: {
    marginTop: 0,
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


class RecipeCookStepsFormFragment extends Component {
  static propTypes = {

  };

  updateImage = (secureUrl, index) => {
    let arr = this.props.cookSteps.slice();
    arr[index].shotcut = secureUrl;
    this.props.setFieldValue("cookSteps", arr);
  };

  render() {
    const { 
      classes, 
      values, 
      handleMouseDown, 
      handleMouseMove,
      handleMouseUp,
      getDraggingStyle, 
      handleChange, 
      handleBlur 
    } = this.props;

    return (
      <div>
        <FieldArray
          name="cookSteps"
          render={arrayHelpers => (
            <div>
              {values.cookSteps && values.cookSteps.length > 0 ? (
                values.cookSteps.map((cookStep, index) => (
                  <div
                    key={index}
                    style={getDraggingStyle(index)}
                    className={classes.root}
                  >
                    <Grid className={classes.gridWrap} container spacing={8}>
                      <Grid item xs={4}>
                        <UploadImages idName={`cookStep-${index}`} index={index} callBack={this.updateImage} />
                        <input
                          id={`cookSteps[${index}].shotcut`}
                          name={`cookSteps[${index}].shotcut`}
                          hidden
                          type="text"
                          value={cookStep.shotcut}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id={`cookSteps[${index}].instruction`}
                          name={`cookSteps[${index}].instruction`}
                          value={cookStep.instruction}
                          className={classes.textFieldMargin}
                          label="Description"
                          multiline
                          fullWidth
                          required
                          rows="5"
                          rowsMax="5"
                          margin="normal"
                          variant="outlined"
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
                  <h3>There is not any cook step yet. Press below button to add one.</h3>
                )}
              <Fab
                color="primary"
                aria-label="Add"
                className={classes.fab}
                onClick={() => arrayHelpers.push({ shotcut: '', instruction: '' })}
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

export default withStyles(styles)(withDnD(RecipeCookStepsFormFragment, "cookSteps"));