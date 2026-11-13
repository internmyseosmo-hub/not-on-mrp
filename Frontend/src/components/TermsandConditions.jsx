import { Link } from "react-router-dom";

const termsSections = [
  {
    "number": "1",
    "title": "INTRODUCTION AND ACCEPTANCE OF TERMS",
    "paragraphs": [
      "a.     Welcome to NotOnMRP.com (\u201cWebsite\u201d or \u201cPlatform\u201d), an e-commerce platform operated as a business unit of Buy Buy Technologies Private Limited, a company incorporated under the laws of India, having its office at C-98, Ground Floor, Sector 65, Noida, Gautam Buddh Nagar, Uttar Pradesh \u2013 201301 (hereinafter referred to as the \u201cCompany\u201d, \u201cNotOnMRP\u201d, \u201cwe\u201d, \u201cus\u201d or \u201cour\u201d).",
      "b.     These Terms and Conditions (\u201cTerms\u201d) govern the access, browsing, registration, purchase, payment, delivery, cancellation, return, refund, and other use of the Website and its associated services.",
      "c.      The Website offers products across various categories, including electronics, electronic accessories, automobile and car-care products, household products, utility products, lifestyle merchandise, and other categories that may be introduced from time to time.",
      "d.     By accessing the Website, creating an account, placing an order, or otherwise using the Platform, you (\u201cCustomer\u201d, \u201cUser\u201d, \u201cBuyer\u201d or \u201cyou\u201d) acknowledge that you have read and understood these Terms and agree to comply with them, together with the applicable Privacy Policy, Shipping and Delivery Policy, Cancellation Policy, Return and Refund Policy, and other policies published on the Website.",
      "e.      If you do not agree to these Terms, you must discontinue use of the Website and refrain from placing orders through the Platform.",
      "f.      These Terms constitute an electronic record under the Information Technology Act, 2000, and applicable rules, as amended from time to time. Electronic acceptance shall be legally effective to the extent recognised under applicable law.",
      "g.     These Terms shall be interpreted in accordance with applicable Indian law. No provision shall be construed as excluding any statutory right or obligation that cannot lawfully be excluded."
    ]
  },
  {
    "number": "2",
    "title": "NATURE OF BUSINESS AND OPERATING MODEL",
    "paragraphs": [
      "a.     NotOnMRP.com is intended to facilitate the online purchase of products at prices and on conditions displayed on the Website. The Company may procure, stock, market, distribute, and sell products through its business operations and may use third-party suppliers, manufacturers, payment service providers, and logistics partners to support fulfilment.",
      "b.     The Company's role in a particular transaction shall be determined by the relevant product listing, seller disclosure, invoice, checkout information, and applicable transaction documents.",
      "c.      Where the Company is the seller, the sale shall be between the Company and the Customer, subject to these Terms and applicable law. Where a third-party seller is involved, the relevant seller's identity and responsibilities shall be disclosed as required by law.",
      "d.     The Website may be modified, updated, expanded, or restricted from time to time. The Company does not guarantee that every product, category, brand, promotional offer, or feature will remain available indefinitely.",
      "e.      The Company reserves the right to discontinue a product, change its catalogue, revise future promotional campaigns, and alter its operational arrangements for legitimate commercial, technical, inventory, or legal reasons.",
      "f.      Nothing in these Terms shall be interpreted as representing that every product displayed on the Website is manufactured by, owned by, or exclusively sold by the Company."
    ]
  },
  {
    "number": "3",
    "title": "ELIGIBILITY AND ACCOUNT REGISTRATION",
    "paragraphs": [
      "a.      The Website may be used by persons legally competent to enter into binding contracts under the Indian Contract Act, 1872, and other applicable laws.",
      "b.     Persons below eighteen years of age may access the Website only under appropriate parental or guardian supervision, where permitted by law. Transactions requiring contractual capacity must be undertaken by a legally competent person.",
      "c.      Customers shall provide accurate, complete, and current information during registration, checkout, payment, delivery, and subsequent communications.",
      "d.     The Customer shall be responsible for errors arising directly from materially incorrect information supplied by the Customer, including an incorrect delivery address or contact number, subject to the Company's own legal obligations.",
      "e.      Customers must maintain the confidentiality of their login credentials and promptly notify the Company of suspected unauthorised access. The Company shall not be responsible for losses attributable solely to the Customer's credential sharing, negligence, or unauthorised disclosure, except to the extent that the Company is legally responsible.",
      "f.      The Company may request reasonable identity, address, or transaction verification where necessary to prevent fraud, protect account security, or comply with applicable law.",
      "g.     The Company may suspend or restrict an account where there are reasonable grounds to suspect fraud, impersonation, unauthorised access, deliberate misuse, or a material breach of these Terms. Such restrictions shall be proportionate and subject to applicable law."
    ]
  },
  {
    "number": "4",
    "title": "PRODUCT LISTINGS, DESCRIPTIONS AND AVAILABILITY",
    "paragraphs": [
      "a.     The Company endeavours to provide accurate descriptions, photographs, specifications, model numbers, sizes, variants, compatibility details, and other material information concerning products displayed on the Website.",
      "b.     Product photographs are intended to assist Customers in identifying products. Minor variations in colour, appearance, or packaging may occur because of screen settings, lighting, manufacturer revisions, or packaging updates. Such variations shall not excuse material misdescription or the supply of a product that does not conform to the order.",
      "c.      Customers are responsible for reviewing the product description, specifications, dimensions, compatibility, intended use, warranty information, and applicable restrictions before placing an order.",
      "d.     For electronic products, Customers should verify compatibility with their existing devices, electrical requirements, connectors, operating systems, and accessories.",
      "e.      For automobile accessories and car-care products, Customers should verify compatibility with the intended vehicle, including its model, variant, dimensions, and installation requirements.",
      "f.      The Company shall not be responsible for incompatibility resulting solely from the Customer's selection of a correctly described product for an unsuitable application, provided that the Company has not made a misleading representation or omitted material information it was legally required to disclose.",
      "g.     Product availability is subject to actual inventory and fulfilment capacity. A listing being visible on the Website does not guarantee that the product will remain available until an order is accepted.",
      "h.     If a product becomes unavailable or a material listing error is identified, the Company may take reasonable corrective action, including declining an order before acceptance or cancelling an affected order where legally permissible. Any refund due shall be processed in accordance with applicable law."
    ]
  },
  {
    "number": "5",
    "title": "PRICING, DISCOUNTS AND MRP COMPLIANCE",
    "paragraphs": [
      "a.      The Company may offer products at discounted, promotional, clearance, or other commercially determined prices, subject to applicable law and the conditions disclosed on the Website.",
      "b.     The selling price applicable to an order shall ordinarily be the price displayed at checkout when the Customer places the order, subject to acceptance of the order and correction of genuine errors in accordance with these Terms.",
      "c.      Where a product is subject to a declared Maximum Retail Price (\u201cMRP\u201d), the Company shall comply with applicable legal requirements concerning MRP declarations and the maximum permissible retail sale price.",
      "d.     The name \u201cNotOnMRP.com\u201d is a brand and domain name. It does not imply exemption from MRP requirements or authorise the sale of packaged commodities in violation of applicable law.",
      "e.      The Company may revise prices, promotional benefits, coupons, and discounts prospectively in response to supplier pricing, inventory conditions, market changes, promotional campaigns, or other legitimate commercial considerations.",
      "f.      The Company shall not be required to provide a retrospective price adjustment merely because the same product is subsequently offered at a lower price, unless an express price-protection commitment applies or the adjustment is otherwise required by law.",
      "g.     Any coupon, discount, or promotional offer may be subject to eligibility conditions, minimum purchase requirements, validity periods, quantity limits, product exclusions, or other restrictions clearly disclosed with the offer.",
      "h.     Promotional benefits shall not be combined, transferred, or redeemed for cash unless expressly permitted by the relevant offer conditions.",
      "i.       Where an obvious typographical, technical, calculation, or pricing error occurs, the Company may correct the error. If the error affects an order already placed, the Company shall communicate with the Customer and resolve the transaction in accordance with applicable law.",
      "j.       The Company shall not knowingly use fictitious reference prices, misleading discount percentages, or deceptive savings claims."
    ]
  },
  {
    "number": "6",
    "title": "ORDER PLACEMENT AND ACCEPTANCE",
    "paragraphs": [
      "a.      Customers may place orders by selecting products, choosing the applicable variants and quantities, entering the required information, and completing the checkout process.",
      "b.     Submission of an order constitutes an offer by the Customer to purchase the selected products under the terms displayed at checkout.",
      "c.      An automated order acknowledgement or payment receipt confirms receipt of the relevant information or payment but does not, by itself, necessarily constitute final acceptance of the order.",
      "d.     Order acceptance shall occur through the confirmation mechanism communicated by the Company, which may include an order confirmation or dispatch confirmation, as applicable to the transaction.",
      "e.      The Company may conduct reasonable verification before accepting an order, including checking stock availability, payment status, delivery serviceability, and suspected fraudulent activity.",
      "f.      The Company reserves the right to decline an order before acceptance or cancel an affected order where there are legitimate grounds, including:",
      "i.     Product unavailability or an inventory discrepancy;",
      "ii.     A material pricing, technical, or listing error;",
      "iii.     Payment failure or an inability to verify a transaction;",
      "iv.     Reasonable suspicion of fraud, impersonation, or unauthorised payment;",
      "v.     An incorrect or unserviceable delivery address;",
      "vi.     A legal restriction affecting the sale or delivery of the product; or",
      "vii.     Another legitimate fulfilment issue that prevents the order from being completed.",
      "g.     Where an order has already been accepted, the Company shall exercise its cancellation rights in accordance with the applicable transaction terms and law.",
      "h.     If the Company cannot fulfil a prepaid order, it shall notify the Customer as appropriate and process any refund legally due.",
      "i.       The Customer shall carefully review the order details before submission. Changes to an order may not be possible after packing, dispatch, or handover to a logistics provider."
    ]
  },
  {
    "number": "7",
    "title": "PAYMENT TERMS AND SECURITY",
    "paragraphs": [
      "a.      Customers shall pay the amount displayed at checkout using the payment methods actually made available on the Website.",
      "b.     Payment options may include UPI, cards, net banking, authorised digital payment services, or cash on delivery, where available.",
      "c.      Payments may be processed through third-party payment gateways, banks, and other authorised payment intermediaries, each of which may apply its own verification and security procedures.",
      "d.     Customers must use payment instruments lawfully and must not submit stolen payment credentials, fabricated transaction confirmations, or unauthorised banking information.",
      "e.      Where a payment is debited but an order is not confirmed, the Customer should provide the transaction reference to customer support. The Company shall reasonably investigate the issue and coordinate with the payment intermediary where necessary.",
      "f.      Refunds shall ordinarily be processed through the original payment method where practicable. If another lawful method is necessary, the Company may seek appropriate confirmation from the Customer.",
      "g.     The actual time taken for a refund to appear in the Customer's account may depend on the relevant bank or payment service provider. The Company shall nevertheless initiate and follow up on refunds within the applicable legal or policy timelines.",
      "h.     The Company shall not be responsible for an intermediary's independent technical failure to the extent the Company has fulfilled its own obligations, but this provision shall not remove any refund or assistance obligation imposed on the Company by law.",
      "i.       Customers must not disclose their passwords, card PINs, OTPs, or confidential authentication credentials to persons claiming to represent the Company."
    ]
  },
  {
    "number": "8",
    "title": "SHIPPING AND DELIVERY",
    "paragraphs": [
      "a.      Orders shall be processed and dispatched subject to product availability, payment verification, serviceable delivery locations, and the applicable fulfilment arrangements.",
      "b.     Estimated delivery dates are indicative unless expressly communicated as guaranteed. Actual delivery may be affected by weather, transportation, logistics, public holidays, security restrictions, or other circumstances beyond reasonable operational control.",
      "c.      Customers must provide complete and accurate delivery details and remain reasonably available to receive their orders.",
      "d.     The Company may engage third-party courier and logistics providers for dispatch, transportation, tracking, and delivery.",
      "e.      Where delivery fails because of an incorrect address, repeated unavailability of the recipient, refusal to accept delivery, or another circumstance attributable to the Customer, the Company may arrange another delivery attempt or take action under the applicable Shipping Policy.",
      "f.      Additional delivery costs, where any are lawfully recoverable, shall be disclosed or communicated as appropriate and shall not be imposed arbitrarily.",
      "g.     Customers are encouraged to report visible packaging damage, tampering, shortages, or incorrect products promptly after delivery, with reasonable supporting evidence where relevant.",
      "h.     Failure to report an issue immediately shall not automatically extinguish a statutory right or valid claim.",
      "i.       The Company's use of a logistics partner shall not automatically exclude liability for non-delivery, deficient service, or another matter for which the Company is legally responsible."
    ]
  },
  {
    "number": "9",
    "title": "CANCELLATION OF ORDERS",
    "paragraphs": [
      "a.      Customers may request cancellation through the available Website functionality or designated customer support channels, subject to the order's processing status and applicable policy.",
      "b.     Cancellation requests received before packing or dispatch may generally be considered where operationally feasible.",
      "c.      Once an order has been packed, dispatched, or delivered, cancellation may no longer be operationally possible. Eligible requests may instead be considered under the applicable return and refund procedure.",
      "d.     The Company may cancel an order on legitimate grounds described in Clause 6, subject to the Customer's accrued rights and applicable law.",
      "e.      Where an order is cancelled by the Company after payment has been received, any refund due shall be initiated in accordance with applicable law.",
      "f.      Any cancellation charge must be lawful, reasonable, and disclosed in advance where required. The Company shall not impose a charge that is prohibited by applicable consumer protection law.",
      "g.     A cancellation policy shall not be used to avoid responsibility for defective, damaged, incorrect, or materially misdescribed products."
    ]
  },
  {
    "number": "10",
    "title": "RETURN, REPLACEMENT AND REFUND POLICY",
    "paragraphs": [
      "a.      Returns, replacements, exchanges, and refunds shall be governed by the Return and Refund Policy published on the Website, the conditions disclosed for the relevant product, and applicable law.",
      "b.     Change-of-mind returns: Where a Customer wishes to return a product solely because of a change of preference, an incorrect personal selection, or a decision not to retain the product, the request shall be considered only where that category of return is permitted under the applicable published policy.",
      "c.      Request period: Customers must submit eligible return or replacement requests within the time period specified in the applicable policy or product listing. The Company should publish a definite return window for eligible products and ensure that the policy is consistent across the Website and checkout process.",
      "d.     Product condition: Where relevant to an eligible return, the product should be returned in the condition required by the applicable policy, with its supplied accessories, components, manuals, warranty documents, and original packaging where reasonably required and available.",
      "e.      Verification: The Company may reasonably inspect a returned product and verify the nature of the complaint, including whether the returned item corresponds to the item supplied and whether the reported issue is consistent with the available evidence.",
      "f.      Defective, damaged or incorrect products: Customers may request an appropriate remedy where a product is defective, damaged, incorrect, materially misdescribed, or otherwise eligible under applicable law or the published policy.",
      "g.     Fraudulent claims: The Company may reject a claim where reliable evidence establishes that it is fraudulent, involves product substitution, or otherwise fails to satisfy a lawful and clearly disclosed eligibility condition. Any rejection shall be supported by reasonable grounds.",
      "h.     Misuse or unauthorised modification: A discretionary return or commercial warranty claim may be declined where the issue is established to have resulted solely from improper installation, deliberate misuse, unauthorised modification, or use contrary to clearly communicated instructions, subject to statutory rights.",
      "i.       Product-specific restrictions: Certain categories may be subject to lawful and clearly disclosed restrictions on change-of-mind returns because of hygiene, safety, perishability, personalisation, or other legitimate product characteristics. Such restrictions shall not override mandatory remedies for defective or misdescribed goods.",
      "j.       Refund method: Approved refunds shall ordinarily be processed through the original payment method, where practicable, or another lawful method appropriately communicated to the Customer.",
      "k.     Refund timing: Refunds shall be initiated within the applicable statutory or published policy timeframe. Bank or payment intermediary processing times may vary after initiation.",
      "l.       No blanket exclusion: Nothing in this clause shall be interpreted as establishing an absolute no-return or no-refund rule or as removing a remedy that the Customer is entitled to under applicable law."
    ]
  },
  {
    "number": "11",
    "title": "WARRANTIES AND PRODUCT USAGE",
    "paragraphs": [
      "a.      Products may be covered by manufacturer warranties, seller warranties, commercial guarantees, or other product-specific arrangements, as disclosed in the applicable listing or documentation.",
      "b.     The scope, duration, exclusions, and procedure of a manufacturer's warranty shall be governed by the relevant warranty terms, subject to applicable law.",
      "c.      The Company shall not be deemed to provide an additional commercial warranty merely because it lists or sells a product, unless such warranty is expressly offered or legally required.",
      "d.     Customers must use products in accordance with applicable instructions, safety warnings, compatibility requirements, and manufacturer recommendations.",
      "e.      For electronics, Customers should use appropriate power supplies, charging equipment, connections, and installation procedures.",
      "f.      For automobile accessories and car-care products, Customers should verify compatibility and follow applicable installation and safety instructions. Professional installation should be obtained where reasonably necessary.",
      "g.     Where an issue is established to have resulted solely from misuse, improper installation, unauthorised modification, or disregard of instructions, a commercial warranty claim may be declined to the extent permitted by the applicable warranty and law.",
      "h.     Nothing in this clause excludes any statutory remedy for defective goods, misrepresentation, deficient services, or other liability that cannot lawfully be excluded."
    ]
  },
  {
    "number": "12",
    "title": "PROMOTIONAL OFFERS AND COUPONS",
    "paragraphs": [
      "a.      The Company may introduce coupons, discounts, bundled offers, promotional campaigns, and other benefits from time to time.",
      "b.     Each offer may be subject to eligibility conditions, validity periods, quantity restrictions, minimum purchase values, product exclusions, and other terms disclosed with the offer.",
      "c.      Unless expressly permitted, promotional benefits cannot be transferred, redeemed for cash, or applied retrospectively to completed transactions.",
      "d.     The Company may restrict access to an offer where reasonable evidence indicates coupon manipulation, fraudulent account creation, automated abuse, or deliberate circumvention of published conditions.",
      "e.      The Company may modify or discontinue future offers for legitimate reasons, subject to any binding benefit already accrued under an accepted transaction and applicable law."
    ]
  },
  {
    "number": "13",
    "title": "CUSTOMER CONDUCT AND PROHIBITED ACTIVITIES",
    "paragraphs": [
      "a.      Customers must use the Website lawfully and must not:",
      "i.     Submit forged, false, or misleading information;",
      "ii.     Engage in payment fraud, identity misuse, or impersonation;",
      "iii.     Submit fabricated damage, delivery, return, or refund claims;",
      "iv.     Deliberately substitute products or manipulate serial numbers or identifying information;",
      "v.     Attempt unauthorised access to the Website's systems or accounts;",
      "vi.     Introduce malware or interfere with the Website's normal operation;",
      "vii.     Use automated tools to manipulate orders, prices, coupons, or promotional schemes without authorisation; or",
      "viii. Infringe the Company's or another person's intellectual property or legal rights.",
      "b.     Where reasonable grounds exist to suspect a violation, the Company may investigate, request relevant information, restrict affected account functionality, decline a transaction before acceptance, or take lawful action.",
      "c.      Restrictions shall be proportionate to the circumstances and shall not prevent Customers from submitting genuine complaints or exercising statutory rights.",
      "d.     Any recovery of damages, costs, or expenses from a Customer must be supported by a lawful basis and be attributable to the relevant conduct."
    ]
  },
  {
    "number": "14",
    "title": "INTELLECTUAL PROPERTY",
    "paragraphs": [
      "a.      The Website's original branding, design, text, graphics, software, layout, compilations, and other proprietary materials are owned by or lawfully licensed to the Company or the relevant rights holders.",
      "b.     No person may reproduce, commercially exploit, modify, distribute, or otherwise use the Company's proprietary materials without appropriate permission, except as permitted by law.",
      "c.      Third-party trademarks, brand names, and logos remain the property of their respective owners. Their display does not, by itself, imply an exclusive commercial relationship or endorsement.",
      "d.     The Company may take appropriate lawful action against unauthorised use, impersonation, infringement, or commercial misuse of its intellectual property."
    ]
  },
  {
    "number": "15",
    "title": "PRIVACY AND PERSONAL INFORMATION",
    "paragraphs": [
      "a.      The Company may process personal information necessary for registration, order fulfilment, payment processing, delivery, customer support, fraud prevention, and other lawful purposes disclosed to Customers.",
      "b.     Personal information shall be handled in accordance with the Privacy Policy and applicable data protection laws.",
      "c.      Necessary information may be shared with authorised payment processors, logistics providers, technology service providers, and other relevant parties where required for the stated purposes or permitted by law.",
      "d.     The Company shall adopt appropriate safeguards for personal information in accordance with applicable legal requirements.",
      "e.      Customers should consult the Privacy Policy for further information regarding data collection, processing, retention, applicable rights, and grievance procedures."
    ]
  },
  {
    "number": "16",
    "title": "LIMITATION OF LIABILITY",
    "paragraphs": [
      "a.      To the maximum extent permitted by law, the Company shall not be liable for losses arising solely from circumstances beyond its reasonable control, provided that it has complied with its own legal and contractual obligations.",
      "b.     To the extent legally permissible, the Company shall not be liable for indirect commercial losses, loss of anticipated profits, or loss of business opportunities arising from a Customer's improper use of the Website.",
      "c.      The Company does not guarantee uninterrupted Website availability, continuous stock availability, or the uninterrupted operation of third-party payment and logistics services.",
      "d.     The Company shall not be responsible for damage attributable solely to improper use, unauthorised modification, or incorrect installation by a Customer, where the Company has not contributed to the damage through a legally actionable act or omission.",
      "e.      The Company shall not be liable for an independent third-party failure to the extent that the failure is outside its reasonable control and no legal responsibility for that failure attaches to the Company.",
      "f.      Nothing in these Terms shall exclude or restrict liability that cannot lawfully be excluded, including mandatory consumer remedies, liability arising from fraud or wilful misconduct, or other non-excludable statutory obligations."
    ]
  },
  {
    "number": "17",
    "title": "INDEMNIFICATION",
    "paragraphs": [
      "a.      To the extent permitted by law, the Customer shall indemnify the Company and its directors, officers, and employees against third-party claims and legally recoverable losses directly arising from the Customer's fraud, unlawful conduct, infringement of third-party rights, or material breach of these Terms.",
      "b.     The obligation shall apply only to the extent that the relevant loss is legally recoverable and attributable to the Customer's conduct.",
      "c.      The Company shall not seek indemnification for its own unlawful conduct, negligence, breach of statutory duty, or liability that cannot lawfully be transferred to a Customer."
    ]
  },
  {
    "number": "18",
    "title": "SUSPENSION AND TERMINATION",
    "paragraphs": [
      "a.      The Company may suspend or restrict access to an account where reasonably necessary to address suspected fraud, unauthorised access, security risks, unlawful conduct, or repeated material violations of these Terms.",
      "b.     Where appropriate and legally permissible, the Company may request verification or provide an opportunity for the Customer to clarify the relevant circumstances.",
      "c.      Suspension or termination shall not automatically extinguish accrued rights or obligations concerning accepted orders, valid refunds, product warranties, or pending complaints.",
      "d.     The Company may discontinue or modify Website features for legitimate operational, technical, commercial, or legal reasons, subject to applicable law."
    ]
  },
  {
    "number": "19",
    "title": "FORCE MAJEURE",
    "paragraphs": [
      "a.      The Company shall not be considered in breach of an affected obligation to the extent that performance is prevented or materially delayed by circumstances beyond its reasonable control, including natural disasters, floods, fires, pandemics, government restrictions, war, civil disturbances, transportation disruptions, or widespread infrastructure failures.",
      "b.     The Company shall take reasonable steps to mitigate the effects of the event and resume performance when practicable.",
      "c.      Where an accepted order cannot be fulfilled because of such an event, the Company shall communicate the relevant impact and provide an appropriate resolution, including a refund where required by law.",
      "d.     This clause shall not authorise the Company to retain an amount that it is legally required to refund."
    ]
  },
  {
    "number": "20",
    "title": "THIRD-PARTY SERVICES",
    "paragraphs": [
      "a.      The Website may rely on third-party payment gateways, courier companies, technology providers, manufacturers, and other service providers.",
      "b.     Such parties may be governed by their own terms and operational policies.",
      "c.      The Company shall not be responsible for matters exclusively attributable to a third party where the Company has no legal responsibility. This shall not exclude liability arising from the Company's own conduct or statutory obligations."
    ]
  },
  {
    "number": "21",
    "title": "AMENDMENT OF TERMS",
    "paragraphs": [
      "a.      The Company may revise these Terms to reflect changes in its business operations, Website features, security requirements, or applicable law.",
      "b.     The revised Terms shall be published on the Website with the relevant effective date or last-updated date.",
      "c.      Changes shall ordinarily operate prospectively and shall not unlawfully alter obligations arising from an accepted transaction.",
      "d.     Where applicable law requires fresh consent or notice, the Company shall comply with that requirement."
    ]
  },
  {
    "number": "22",
    "title": "CUSTOMER SUPPORT AND GRIEVANCE REDRESSAL",
    "paragraphs": [
      "a.      Customers may raise complaints regarding orders, payments, products, delivery, cancellations, returns, refunds, or other Website-related matters through the official support channels published on the Website.",
      "b.     Customers should provide the order number, relevant transaction details, a description of the complaint, and reasonable supporting information where necessary.",
      "c.      The Company shall maintain and operate a grievance redressal mechanism in accordance with the legal requirements applicable to its business model.",
      "d.     Complaints shall be acknowledged and addressed within the timelines prescribed by applicable law, including the Consumer Protection (E-Commerce) Rules, 2020, as amended or otherwise applicable.",
      "e.      Grievance Officer details:",
      "\u00b7 Name: \u2026\u2026\u2026\u2026\u2026\u2026\u2026\u2026.",
      "\u00b7 Designation: Grievance Officer",
      "\u00b7 Email: \u2026\u2026\u2026\u2026\u2026\u2026\u2026\u2026",
      "\u00b7 Contact Number: \u2026\u2026\u2026\u2026\u2026\u2026\u2026\u2026",
      "\u00b7 Address: Buy Buy Technologies Private Limited, C-98, Ground Floor, Sector 65, Noida, Gautam Buddh Nagar, Uttar Pradesh \u2013 201301.",
      "f.      Customers retain the right to approach the appropriate consumer commission, regulatory authority, or other competent forum under applicable law."
    ]
  },
  {
    "number": "23",
    "title": "GOVERNING LAW AND JURISDICTION",
    "paragraphs": [
      "a.      These Terms shall be governed by the laws of India.",
      "b.     The Company encourages Customers to contact customer support or the Grievance Officer for resolution of concerns, without making internal resolution a mandatory precondition to exercising statutory rights.",
      "c.      Subject to mandatory statutory jurisdiction and applicable consumer protection law, courts having competent jurisdiction at Noida, Gautam Buddh Nagar, Uttar Pradesh, shall have jurisdiction over disputes arising from these Terms.",
      "d.     Nothing in this clause shall restrict a Customer's right to approach a competent consumer dispute redressal forum under the Consumer Protection Act, 2019."
    ]
  },
  {
    "number": "24",
    "title": "SEVERABILITY AND WAIVER",
    "paragraphs": [
      "a.      If any provision of these Terms is held invalid or unenforceable, the remaining provisions shall continue to operate to the extent permitted by law.",
      "b.     Failure or delay by the Company in exercising a contractual right shall not automatically constitute a waiver of that right.",
      "c.      No provision shall be interpreted as waiving a statutory right where such waiver is not legally permissible."
    ]
  },
  {
    "number": "25",
    "title": "ENTIRE AGREEMENT AND PRECEDENCE",
    "paragraphs": [
      "a)     These Terms, together with the applicable Privacy Policy, Shipping and Delivery Policy, Cancellation Policy, Return and Refund Policy, product-specific conditions, and transaction disclosures, constitute the contractual framework governing use of the Website.",
      "b)     Where a specific policy addresses a particular subject, that policy shall govern the subject to the extent that it is valid, clearly disclosed, and consistent with applicable law.",
      "c)     No provision of these Terms shall be interpreted as creating a partnership, employment relationship, or agency between the Company and a Customer.",
      "d)     Nothing in these Terms shall override a mandatory legal requirement or remove a right that cannot lawfully be waived."
    ]
  },
  {
    "number": "26",
    "title": "CONTACT INFORMATION",
    "paragraphs": [
      "For queries, complaints, or clarification regarding these Terms and Conditions, Customers may contact the Company through its official communication channels.",
      "Website: https://notonmrp.com",
      "Operating Entity: Buy Buy Technologies Private Limited",
      "Office Address: C-98, Ground Floor, Sector 65, Noida, Gautam Buddh Nagar, Uttar Pradesh \u2013 201301",
      "Customer Support Email: \u2026\u2026\u2026\u2026..",
      "Customer Support Number: \u2026\u2026\u2026\u2026\u2026\u2026\u2026\u2026",
      "Grievance Officer Email: \u2026\u2026\u2026\u2026\u2026\u2026\u2026."
    ]
  },
  {
    "number": "27",
    "title": "FINAL ACKNOWLEDGEMENT",
    "paragraphs": [
      "a.      By accessing or using NotOnMRP.com or placing an order through the Website, the Customer acknowledges having had the opportunity to review these Terms and the policies applicable to the relevant transaction.",
      "b.     The Customer agrees to comply with these Terms and all lawful requirements governing the use of the Website.",
      "c.      These Terms shall be interpreted consistently with applicable Indian law. Where a provision conflicts with a mandatory legal requirement, that legal requirement shall prevail to the extent of the conflict."
    ]
  }
];

export default function TermsandConditions() {
  return (
    <main className="bg-[#FFFDF9] px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
      <article className="mx-auto max-w-4xl">
        <header className="mb-10 border-b-4 border-[#FFC530] pb-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#E31E24]">
            NotOnMRP.com
          </p>
          <h1 className="font-display text-3xl font-black uppercase tracking-tight text-[#231F20] sm:text-5xl">
            Terms and Conditions
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#231F20]/70 sm:text-base">
            Please read these terms carefully before accessing the Website, creating an account, or placing an order.
          </p>
        </header>

        <div className="space-y-10">
          {termsSections.map((section) => (
            <section key={section.number} className="scroll-mt-24">
              <h2 className="font-display text-xl font-extrabold leading-tight text-[#231F20] sm:text-2xl">
                <span className="mr-2 text-[#E31E24]">{section.number}.</span>
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-[#231F20]/85 sm:text-base">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={`${section.number}-${index}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-12 border-t border-amber-200 pt-6 text-sm leading-7 text-[#231F20]/70">
          Questions about these terms can be sent through our <Link to="/contact" className="font-semibold text-[#E31E24] hover:underline">Contact Us</Link> page.
        </footer>
      </article>
    </main>
  );
}
