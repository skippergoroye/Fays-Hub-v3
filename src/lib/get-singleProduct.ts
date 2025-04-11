export default async function getsingleProduct(productId: number) {
  const res = await fetch(
    `https://api.timbu.cloud/products/${productId}?organization_id=d953e31b22eb4f7380c81a8dfb1c6063&Appid=1YMH6UYIF70BF7W&Apikey=f4d8e6a4b5d94d7696e4cb943f0b0a0d20240712233045598414`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch single product");
  }

  return res.json();
}
