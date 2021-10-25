import React from 'react';
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
    return (
      <aside>
        {categories.map((categorie) => (
          <p key={ categorie.id }>
            <label data-testid="category" htmlFor={ categorie.id }>
              <input
                type="checkbox"
                name={ categorie.id }
              />
              { categorie.name }
            </label>
          </p>
        ))}
      </aside>
    );
  }
}

export default Categories;
