import React, { Component } from 'react';
import UploadImages from './UploadImages';

class RecipeCoverFormFragment extends Component {
  static propTypes = {

  };

  updateImageUrl = url => {
    this.props.setFieldValue("coverImage", url);
  };

  render() {
    const { values } = this.props;
    return (
      <div>
        <UploadImages idName="coverImage" size="big" callBack={this.updateImageUrl} />
        <input 
          id="coverImage"
          name="coverImage"
          hidden 
          type="text" 
          value={values.coverImage} 
        />
      </div>
    );
  }
}

export default RecipeCoverFormFragment;