export const generatePagination = (currentPage: number, totalPages: number) => {
  // si el numero total de paginas es 7 o menos
  // vamos a mostrar todas las paginas sin puntos suspensivos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  //   si la pagina actual esta entre las primeras 3 paginas
  // mostrar las primeras 3, puntos suspensivos, las 2 ultimas

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  //   si la pagina actual esta entre las ultimas 3 paginas
  // mostrar las primeras 2, puntos suspensivos, las 3 ultimas

  if (currentPage <= 3) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  //   si la paghina actual esta en otro logar medio
  // mostrar la primera pagina puntos suspensivos la pagina actual y vecinos

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
