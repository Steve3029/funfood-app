import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Button, TextField, MenuItem } from '@material-ui/core';

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
  selectField: {
    width: "50%",
    textAlign: "left",
  },
  buttonPosition: {
    width: "50%",
    textAlign: "right",
    marginLeft: "50%",
    marginTop: theme.spacing.unit * 3,
  },
});

class RecipeInfoFormFragment extends Component {
  static propTypes = {

  };

  render() {
    const { classes } = this.props;
    return (
      <div>
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
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(RecipeInfoFormFragment);