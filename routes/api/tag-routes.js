const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  try {
    const allTags = await Tag.findAll({
  // be sure to include its associated Product data
  include: [{model: Product, through: ProductTag}],
});
res.status(200).json(allTags);
}
catch (err) {
console.log(err);
res.status(400).json(err);
}
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
  // be sure to include its associated Product data
      include: [{model: Product, through: ProductTag}]
    });

    if (!singleTag) {
      res.status(404).json({ message: "Unfortunately, there was no tag found." });
      return
    }

    res.status(200).json(singleTag);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
    });
    if (updateTag[0] === 0) {
      res.status(404).json({ message: "Unfortunately, there was no tag found." });
      return
    }
    res.status(200).json(updateTag);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteTag) {
      res.status(404).json({ message: "Unfortunately, there was no tag found." });
      return;
    }

    res.status(200).json(deleteTag);
  }
    catch(err) {
    // console.log(err);
    res.status(400).json(err);
    } 
});

module.exports = router;
