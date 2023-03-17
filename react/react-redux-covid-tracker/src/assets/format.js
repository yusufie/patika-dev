export const formatCountryName = (country) => {
    return country.charAt(0).toUpperCase() + country.slice(1);
  }
  
export const formatName = (name) => {
    return name.charAt(0).toLowerCase() + name.slice(1);
  }

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleString('tr-TR', options);
    return formattedDate;
  }