export function generateSlug(name) {
  if (!name || typeof name !== "string") return "unknown";
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Удаляем специальные символы
    .replace(/\s+/g, "-") // Заменяем пробелы на дефисы
    .replace(/-+/g, "-"); // Удаляем множественные дефисы
}
