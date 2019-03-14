import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FieldArray } from 'formik';
import { TextField, IconButton, Fab } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DragIndicator from '@material-ui/icons/DragIndicator';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
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

const move = (arr, startIndex, toIndex) => {
  arr = arr.slice();
  arr.splice(toIndex, 0, arr.splice(startIndex, 1)[0]);
  return arr;
};

class RecipeIngredientsFormFragment extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      draggingIndex: -1,
      startPageY: 0,
      offsetPageY: 0,
    };
  }

  // handle dragging start activity
  handleMouseDown = (evt, index) => {
    this.setState({
      dragging: true,
      startPageY: evt.pageY,
      currentPageY: evt.pageY,
      draggingIndex: index,
      lineHeight: evt.target.parentNode.clientHeight,
    });
  }

  // handle drop off
  handleMouseUp = () => {
    this.setState({
      dragging: false,
      startPageY: 0,
      draggingIndex: -1
    });
  };

  // handle mouse moving
  handleMouseMove = evt => {
    let offset = evt.pageY - this.state.startPageY;
    const draggingIndex = this.state.draggingIndex;
    const lineHeight = this.state.lineHeight;

    if (offset > lineHeight && draggingIndex < this.props.values.ingredients.length - 1) {
      // move down
      offset -= lineHeight;
      this.props.setFieldValue("ingredients", move(this.props.values.ingredients, draggingIndex, draggingIndex + 1));
      this.setState({
        draggingIndex: draggingIndex + 1,
        startPageY: this.state.startPageY + lineHeight,
      });
    } else if (offset < -lineHeight && draggingIndex > 0) {
      // move up
      offset += lineHeight;
      this.props.setFieldValue("ingredients", move(this.props.values.ingredients, draggingIndex, draggingIndex - 1));
      this.setState({
        draggingIndex: draggingIndex - 1,
        startPageY: this.state.startPageY - lineHeight,
      });
    }
    this.setState({ offsetPageY: offset });
  }

  getDraggingStyle = index => {
    if (index !== this.state.draggingIndex)
      return {};
    return {
      backgroundColor: "#eee",
      transform: `translate(10px, ${this.state.offsetPageY}px)`,
      opacity: 0.5,
    };
  }

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
                  <div 
                    key={index}
                    style={this.getDraggingStyle(index)}
                  >
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
                      aria-label="Drag"
                      onMouseDown={evt => this.handleMouseDown(evt, index)}
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
        {this.state.dragging && (
          <div 
            className={classes.dndMask}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(RecipeIngredientsFormFragment)