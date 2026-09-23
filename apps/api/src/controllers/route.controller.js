import { INITIAL_ROUTES } from '../data/initialData.js';

export const getAllRoutes = async (req, res, next) => {
  try {
    const { origin, destination } = req.query;
    let routes = [...INITIAL_ROUTES];

    if (origin) {
      routes = routes.filter((r) => r.origin.toLowerCase().includes(origin.toLowerCase()));
    }
    if (destination) {
      routes = routes.filter((r) => r.destination.toLowerCase().includes(destination.toLowerCase()));
    }

    res.status(200).json({
      success: true,
      count: routes.length,
      data: routes,
    });
  } catch (error) {
    next(error);
  }
};

export const getRouteBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const route = INITIAL_ROUTES.find((r) => r.slug.toLowerCase() === slug.toLowerCase());

    if (!route) {
      return res.status(404).json({
        success: false,
        message: `Route '${slug}' not found.`,
      });
    }

    res.status(200).json({
      success: true,
      data: route,
    });
  } catch (error) {
    next(error);
  }
};
