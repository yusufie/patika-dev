const Furniture = require('../models/Furniture');
const Category = require('../models/Category');
const User = require('../models/User');


exports.createFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      user: req.session.userID
    });

    req.flash("success", `${furniture.name} has been created successfully`);
    res.status(201).redirect('/furnitures');
  } catch (error) {
    req.flash("error", `Something happened!`);
    res.status(400).redirect('/furnitures');
  }
};




exports.getAllFurnitures = async (req, res) => {
  try {

    const categorySlug = req.query.categories;
    const query = req.query.search;

    const category = await Category.findOne({slug:categorySlug})

    let filter = {};
    if(categorySlug) {
      filter = {category:category._id}
    }

    if(query) {
      filter = {name:query}
    }

    if(!query && !categorySlug) {
      filter.name = "",
      filter.category = null
    }

    const furnitures = await Furniture.find({
      $or:[
        {name: { $regex: '.*' + filter.name + '.*', $options: 'i'}},
        {category: filter.category}
      ]
    }).sort('-createdAt').populate('user');
    const categories = await Category.find();
    const user = await User.findById(req.session.userID);

    res.status(200).render('furnitures', {
      furnitures,
      categories,
      page_name: 'furnitures',
      user
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
exports.getFurniture = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const furniture = await Furniture.findOne({slug: req.params.slug}).populate('user')
    const furnitures = await Furniture.find({ user: req.session.userID });
    const categories = await Category.find();
    res.status(200).render('furniture', {
      furniture,
      page_name: 'furnitures',
      user,
      categories,
      furnitures
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
exports.buyFurniture = async (req, res) => {
  try {    
    const user = await User.findById(req.session.userID);
    await user.furnitures.push({_id:req.body.furniture_id});
    await user.save();
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
exports.cancelFurniture = async (req, res) => {
  try {    
    const user = await User.findById(req.session.userID);
    await user.furnitures.pull({_id:req.body.furniture_id});
    await user.save();

    req.flash("error", `has been canceled successfully`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.deleteFurniture = async (req, res) => {
  try {    

    const furniture = await Furniture.findOneAndRemove({slug:req.params.slug})

    req.flash("error", `${furniture.name} has been removed successfully`);

    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
}; 

exports.updateFurniture = async (req, res) => {
  try {    

    const furniture = await Furniture.findOne({slug:req.params.slug});
    furniture.name = req.body.name;
    furniture.price = req.body.price;
    furniture.category = req.body.category;

    furniture.save();
    req.flash("success", `${furniture.name} has been updated successfully`);
    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};