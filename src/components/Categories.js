import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
    this.getCategoriesFromAPI = this.getCategoriesFromAPI.bind(this);
  }

  componentDidMount() {
    this.getCategoriesFromAPI();
  }

  async getCategoriesFromAPI() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    const { handleChange } = this.props;
    return (
      <aside>

        {categories.map((categorie) => (
          <p key={ categorie.id }>
            <label htmlFor={ categorie.id }>
              <input
                type="checkbox"
                name="categorieId"
                value={ categorie.id }
                onChange={ handleChange }
                data-testid="category"
                id={ categorie.id }
              />
              { categorie.name }
            </label>
          </p>
        ))}

      </aside>
    );
  }
}

Categories.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Categories;
