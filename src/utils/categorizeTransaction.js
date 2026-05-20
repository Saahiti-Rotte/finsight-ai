export default function categorizeTransaction(
  name
) {
  const lower =
    name.toLowerCase();

  // FOOD
  if (
    lower.includes("swiggy") ||
    lower.includes("zomato") ||
    lower.includes("dominos") ||
    lower.includes("pizza") ||
    lower.includes("burger")
  ) {
    return "Food";
  }

  // TRANSPORT
  if (
    lower.includes("uber") ||
    lower.includes("ola") ||
    lower.includes("rapido") ||
    lower.includes("metro")
  ) {
    return "Transport";
  }

  // SHOPPING
  if (
    lower.includes("amazon") ||
    lower.includes("flipkart") ||
    lower.includes("myntra")
  ) {
    return "Shopping";
  }

  // SUBSCRIPTIONS
  if (
    lower.includes("netflix") ||
    lower.includes("spotify") ||
    lower.includes("prime") ||
    lower.includes("youtube")
  ) {
    return "Subscription";
  }

  // GROCERIES
  if (
    lower.includes("blinkit") ||
    lower.includes("instamart") ||
    lower.includes("zepto")
  ) {
    return "Groceries";
  }

  return "Other";
}