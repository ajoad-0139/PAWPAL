const handleFilterChange = (setSearchParams, updates) => {
  setSearchParams((prevParams) => {
    const sp = new URLSearchParams(prevParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (key === "age") {
        if (value.min === null || value.max === null) {
          sp.delete("minAge");
          sp.delete("maxAge");
        } else {
          sp.set("minAge", value.min);
          sp.set("maxAge", value.max);
        }
      } else if (key === "page") {
         console.log(value, 'filterchange')
        if (value) sp.set(key, value);
      } else {
        const current = sp.get(key)?.split(",") || [];
        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];

        if (updated.length === 0) {
          sp.delete(key);
        } else {
          sp.set(key, updated.join(","));
        }
      }
    });

    return sp;
  });
};

export default handleFilterChange;
