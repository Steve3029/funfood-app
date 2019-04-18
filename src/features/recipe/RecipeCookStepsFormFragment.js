import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, IconButton, Fab, Grid, FormHelperText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DragIndicator from '@material-ui/icons/DragIndicator';
import withDnD from './withDnD';
import { FieldArray, getIn } from 'formik';
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




class RecipeCookStepsFormFragment extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired, 
    values: PropTypes.object, 
    handleMouseDown: PropTypes.func.isRequired, 
    handleMouseMove: PropTypes.func.isRequired,
    handleMouseUp: PropTypes.func.isRequired,
    getDraggingStyle: PropTypes.func.isRequired, 
    handleChange: PropTypes.func.isRequired, 
    handleBlur: PropTypes.func.isRequired,
    errors: PropTypes.object,
    touched: PropTypes.bool, 
    setFieldValue: PropTypes.func.isRequired,
  };

  static defaultProps = {
    classes: {},
    values: {},
    handleMouseDown: undefined,
    handleMouseUp: undefined,
    handleMouseMove: undefined,
    getDraggingStyle: undefined,
    handleChange: undefined,
    handleBlur: undefined,
    errors: undefined,
    touched: false,
    setFieldValue: undefined,
  };

  constructor(props) {
    super(props);

    this.updateImage = this.updateImage.bind(this);
    this.getErrorMsg = this.getErrorMsg.bind(this);
    this.hasError = this.hasError.bind(this);
  }

  updateImage(secureUrl, index) {
    let arr = this.props.values.instructions.slice();
    arr[index].imageUrl = secureUrl;
    this.props.setFieldValue("instructions", arr);
  }

  getErrorMsg(errors, touched, name) {
    const error = getIn(errors, name);
    const touch = getIn(touched, name);
    return touch && error ? error : null;
  }

  hasError(errors, touched, name) {
    const error = getIn(errors, name);
    const touch = getIn(touched, name);
    return touch && error ? true : false;
  }

  render() {
    const { 
      classes, 
      values, 
      handleMouseDown, 
      handleMouseMove,
      handleMouseUp,
      getDraggingStyle, 
      handleChange, 
      handleBlur,
      errors,
      touched, 
    } = this.props;

    const instructionsError = typeof errors.instructions === 'string' 
      ? errors.instructions 
      : null;

    return (
      <div>
        <FieldArray
          name="instructions"
          render={arrayHelpers => (
            <div>
              {values.instructions && values.instructions.length > 0 ? (
                values.instructions.map((instruction, index) => (
                  <div
                    key={index}
                    style={getDraggingStyle(index)}
                    className={classes.root}
                  >
                    <Grid className={classes.gridWrap} container spacing={8}>
                      <Grid item xs={4}>
                        <UploadImages idName={`instruction-${index}`} index={index} size="small" callBack={this.updateImage} />
                        <input
                          id={`instructions[${index}].imageUrl`}
                          name={`instructions[${index}].imageUrl`}
                          hidden
                          type="text"
                          value={instruction.imageUrl}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id={`instructions[${index}].description`}
                          name={`instructions[${index}].description`}
                          value={instruction.description}
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
                          helperText={this.getErrorMsg(errors, touched, `instructions[${index}].description`)}
                          error={this.hasError(errors, touched, `instructions[${index}].description`)}
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
                    <h3>There is not any cook step yet. Press below button to add one.</h3>
                    {instructionsError
                      &&
                      (<div className={classes.errorContainer}>
                        <FormHelperText
                          id="ingredients-error"
                          variant="filled"
                          margin="dense"
                          className={classes.errorMsg}
                        >
                          {instructionsError}
                        </FormHelperText>
                      </div>)
                    }
                  </div>
                )}
              <Fab
                color="primary"
                aria-label="Add"
                className={classes.fab}
                onClick={() => arrayHelpers.push({ imageUrl: '', description: '' })}
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

export default withStyles(styles)(withDnD(RecipeCookStepsFormFragment, "instructions"));