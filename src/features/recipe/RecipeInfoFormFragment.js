import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Button, TextField, MenuItem } from '@material-ui/core';

const numberToServe = [
  {
    value: 1,
    label: "1"
  },
  {
    value: 2,
    label: "2"
  },
  {
    value: 3,
    label: "3"
  },
  {
    value: 4,
    label: "4"
  },
  {
    value: 5,
    label: "5"
  },
];

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
    recipe: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const categories = this.props.recipe.recipeCategories;
    if(categories == null) {
      this.props.actions.fetchCategories();
    }
  }

  handleChange(name) {
    return event => {
      this.props.setFieldValue(name, event.target.value);
    }
  }

  render() {
    const categories = this.props.recipe.recipeCategories;
    const { 
      classes, 
      errors, 
      touched, 
      handleChange, 
      handleBlur,
      values, 
    } = this.props;
    return (
      <div>
        {/* {initialValues && <title>{initialValues.title}</title>} */}
        <div className={classNames(classes.buttonPosition, classes.fieldMargin)}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.margin}
            type="submit"
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
            value={values.title}
            className={classes.fieldMargin}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.title ? errors.title : ""}
            error={touched.title && Boolean(errors.title)}
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
            value={values.subtitle}
            className={classes.fieldMargin}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.subtitle ? errors.subtitle : ""}
            error={touched.subtitle && Boolean(errors.subtitle)}
          />
          <div className={classes.selectEls}>
            <TextField
              id="categoryId"
              name="categoryId"
              select
              className={classNames(classes.selectField, classes.fieldMargin)}
              variant="outlined"
              label="Choose Category"
              value={values.categoryId}
              onChange={this.handleChange('categoryId')}
            >
              {categories && categories.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="serve"
              select
              className={classNames(classes.selectField, classes.fieldMargin)}
              variant="outlined"
              label="serve"
              value={values.serve}
              onChange={this.handleChange('serve')}
            >
              {numberToServe.map(item => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
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
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.description ? errors.description : ""}
            error={touched.description && Boolean(errors.description)}
          />
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    recipe: state.recipe,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RecipeInfoFormFragment));

