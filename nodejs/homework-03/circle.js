let pi = 3.14159265359;

let circleArea = (radius) => {
  let circleArea = pi * Math.pow(radius, 2);
  console.log(`Yarıçapı (${radius}) olan dairenin alanı: (${parseFloat(circleArea).toFixed(2)})`);
};

let circleCircumference = (radius) => {
  let circleCircumference = 2 * pi * radius;
  console.log(`Yarıçapı (${radius}) olan dairenin çevresi: (${parseFloat(circleCircumference).toFixed(2)})`);
};

module.exports = { circleArea, circleCircumference };
