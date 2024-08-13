export function flattenCategories(categories: any) {
  const flattened: any[] = [];

  categories.forEach((category: any) => {
    // Push the current category
    flattened.push(category);
    // If there are children, recursively flatten them
    if (category.children && category.children.length > 0) {
      const flattenedChildren = flattenCategories(category.children);
      flattened.push(...flattenedChildren);
    }
  });

  return flattened;
}
