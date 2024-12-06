import request from "./request";

export const getCategoriesList = async (hotel: string) => {
  try {
    const response = await request.get(
      hotel && hotel !== ""
        ? `/admin/categorieslist?hotel=${hotel}`
        : "/admin/categorieslist",
      {
        headers: { requiresAuth: true },
      }
    );
    return response.data.body;
  } catch (error) {
    throw error;
  }
};

export const createCategorySuperAdmin = async (data: any) => {
  try {
    const response = await request.post("/admin/category/new", data, {
      headers: { requiresAuth: true },
    });
    return response.data.body;
  } catch (error) {
    throw error;
  }
};

export const createSubCatSuperADmin = async (data: any) => {
  try {
    const response = await request.post("/admin/subcategory/new", data, {
      headers: { requiresAuth: true },
    });
    return response.data.body;
  } catch (error) {
    throw error;
  }
};

export const createSubCatHotelADmin = async (data: any) => {
  try {
    const response = await request.post("/hotel/subcategory/new", data, {
      headers: { requiresAuth: true },
    });
    return response.data.body;
  } catch (error) {
    throw error;
  }
};

export const createCategoryHotelAdmin = async (data: any) => {
  try {
    const response = await request.post("/hotel/category/new", data, {
      headers: { requiresAuth: true },
    });
    return response.data.body;
  } catch (error) {
    throw error;
  }
};
