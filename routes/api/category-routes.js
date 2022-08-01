const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll({
  // be sure to include its associated Products
  include: [{model: Product}],
});
res.status(200).json(allCategories);
} catch (err) {
console.log(err);
res.status(400).json(err);
}
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
  // be sure to include its associated Products
  include: [{model: Product}]
});

if (!singleCategory) {
  res.status(404).json({ message: 'Unfortunately, there was no category found.' });
  return
}

res.status(200).json(singleCategory);
} catch (err) {
console.log(err);
res.status(400).json(err);
}
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
    });

    if (updateCategory[0] === 0) {
      res.status(404).json({ message: 'Unfortunately, there was no category found.' });
      return
    }
    res.status(200).json(updateCategory);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCategory) {
      res.status(404).json({ message: 'Unfortunately, there was no category found.' });
      return
    }

    res.status(200).json(deleteCategory);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
