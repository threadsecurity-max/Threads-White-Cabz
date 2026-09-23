import { INITIAL_SERVICES } from '../data/initialData.js';

export const getAllServices = async (req, res, next) => {
  try {
    const { category } = req.query;
    let services = [...INITIAL_SERVICES];

    if (category) {
      services = services.filter((s) => s.category.toLowerCase() === category.toLowerCase());
    }

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const service = INITIAL_SERVICES.find((s) => s.slug.toLowerCase() === slug.toLowerCase());

    if (!service) {
      return res.status(404).json({
        success: false,
        message: `Service '${slug}' not found.`,
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};
