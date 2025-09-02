---
created: 2025-03-12T11:28
updated: 2025-09-01T15:05
---
# Public Profiles
Much of my work is closed source, as most of my career has been working on proprietary SaaS.
With that said, you can see some of my public works linked below.
- [Pricefx Gitlab Profile](https://gitlab.pricefx.eu/users/sean.missingham/contributed)
- [Public GitHub Profile](https://github.com/smissingham)
# Noteworthy Projects
## [Pricefx Login Vault](https://chromewebstore.google.com/detail/pricefx-vault/jfbbihaiagnjdonfihekeeklcjmbljih) (2019 - Present)
This is likely my most notable project that is available publicly.
This browser extension is built and maintained by two people within Pricefx, [Simon Bechard](https://bechard.dev) and myself.
I am the primary product owner, he is the primary contributor, and we each share both hats.

We have recently exceeded 1,000 weekly active users, despite Pricefx only having ~500 staff, a small percentage of whom are users of this extension. Most of our users are partner implementers of Pricefx, employed by GSI's like DeLoitte, PwC, Accenture and others.

The extension does many things, but most critically it provides a place for power users of the Pricefx application to store their many logins, sync those logins to their Chrome or Mozilla browser accounts, and rest assured knowing that all stored data is encrypted.
### Technologies Used
- Languages
	- Typescript
- Back End / Toolchain
	- [Plasmo](https://plasmo.com)
- Front End
	- TailwindCSS
	- Shadcn
### Key Features
- Encrypted Password Storage & Sync to Browser Accounts
- Pricefx environment coloring (for recognisability between instances)
- Easy access sharing (automates user creation and share to others)
- Favourites / Recents management & sorting
- Configuration code browsing
- Command menus for rapid navigation with keyboard
- Application tweaks for power-users, that are stuck on engineering backlog...

___
## [Parvo Protect](https://parvoprotect.com) (2022-2023)
Parvo Protect is a web application where vets around Australia can register for funding from the nonprofit. Depending on region, number of already-registered vets, and much more, there was an approval workflow where administrators could allocate funding and approve/deny claims.

This project was for a non-profit organisation in Australia called [Paws for a Purpose](http://www.pawsforapurpose.org/), aiming to reduce/eradicate parvovirus. I was the project owner, and primary of two developers.

### Technologies Used
- Languages
	- Typescript
- Back End / Toolchain
	- [AWS Amplify](https://aws.amazon.com/amplify/)
		- AWS Cognito
		- AWS ElasticSearch
		- AWS DynamoDB
		- AWS Lambda
		- AWS Route53
- Front End
	- NextJS / React
	- TailwindCSS
	- ChakraUI

### Key Features
- Vet practice self registration & admin approval workflow
- Pet Owner self registration & concession approval flow
- Full data traversal dashboards for admins, partial access for vets
- Claim process initiation and approval workflow for owner & vet
- Pet vaccination status management for pet owners

