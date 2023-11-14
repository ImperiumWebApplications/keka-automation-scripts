var myHeaders = new Headers();
myHeaders.append(
  "sec-ch-ua",
  '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"'
);
myHeaders.append("sec-ch-ua-mobile", "?0");
myHeaders.append(
  "Authorization",
  "Bearer 52CD8B0C5ACE28E0D377FE0E84AA96AB03591EA42E507BC17B7ADDD3B2FD045A-1"
);
myHeaders.append(
  "User-Agent",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
);
myHeaders.append("Content-Type", "application/json; charset=UTF-8");
myHeaders.append("Accept", "application/json, text/plain, */*");
myHeaders.append("Referer", "https://ibexlabs.keka.com/");
myHeaders.append("X-Requested-With", "XMLHttpRequest");
myHeaders.append("sec-ch-ua-platform", '"macOS"');

var raw = "{}";

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch(
  "https://ibexlabs.keka.com/k/dashboard/api/mytime/attendance/webclockin",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
