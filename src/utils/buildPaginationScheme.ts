export function buildPaginationScheme(currentPage, pagesCount) {
  const prevPageNumber = +currentPage - 1 // предполагаемая предыдущая страница, может получиться отрицательной
  const nextPageNumber = +currentPage + 1 // предполагаемая следующая страница, может получиться больше максимальной
  const scheme = [1, prevPageNumber, +currentPage, nextPageNumber, pagesCount] // строим схему
  const filteredScheme = scheme.filter(item => item > 0 && item <= pagesCount) // чистим те, которые меньше 0 или больше pagesCounter
  const set = new Set(filteredScheme) // удаляем дубли
  const result = Array.from(set) // обратно приводим к массиву

  if (result[0] + 1 !== result[1]) result.splice(1, 0, '...') // если между первым и вторым элементом пропуск, вставляем ...
  if (result.at(-2) + 1 !== result.at(-1)) result.splice(result.length - 1, 0, '...') // если между последним и предпоследним пропуск, вставляем ...

  return result
}
