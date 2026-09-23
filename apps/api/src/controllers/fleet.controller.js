import { INITIAL_FLEET } from '../data/initialData.js';

export const getFleet = async (req, res, next) => {
  try {
    const { category } = req.query;
    let fleet = [...INITIAL_FLEET];

    if (category) {
      fleet = fleet.filter((f) => f.category.toLowerCase() === category.toLowerCase());
    }

    res.status(200).json({
      success: true,
      count: fleet.length,
      data: fleet,
    });
  } catch (error) {
    next(error);
  }
};
