import React, { Component } from 'react';
import UploadImages from './UploadImages';

class RecipeCoverFormFragment extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
  }

  updateImageUrl = url => {
    this.props.values.coverImage = url;
  };

  render() {
    const { values, onChange } = this.props;
    return (
      <div>
        <UploadImages callBack={this.updateImageUrl} />
        <input 
          hidden 
          type="text" 
          value={values.coverImage} 
          onChange={onChange}
        />
      </div>
    );
  }
}

export default RecipeCoverFormFragment;