<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth.ts'

const showMenu = shallowRef(false)
const { signOut } = useAuthStore()

const menuItems = [
	{
		name: 'Top',
		to: { name: 'index' },
		icon: 'carbon:home',
	},
] as const

function toggleMenu(): void {
	showMenu.value = !showMenu.value
}

function closeMenu(): void {
	showMenu.value = false
}
</script>

<template>
	<nav>
		<!-- Desktop Menu -->
		<div class="desktop-menu">
			<NuxtLink
				v-for="item in menuItems"
				:key="item.name"
				:to="item.to"
				class="menu-link"
			>
				<Icon :name="item.icon" />
				{{ item.name }}
			</NuxtLink>

			<button
				type="button"
				class="menu-link"
				@click="signOut"
			>
				<Icon name="carbon:logout" />
				Logout
			</button>
		</div>

		<!-- Mobile Menu Button -->
		<div class="mobile-menu-btn">
			<button
				type="button"
				class="mobile-btn"
				aria-label="Toggle menu"
				@click="toggleMenu"
			>
				<div
					v-if="!showMenu"
					class="hamburger"
				>
					<div class="bar"></div>
					<div class="bar"></div>
					<div class="bar"></div>
				</div>
				<Icon
					v-else
					name="carbon:close"
					class="icon-close"
				/>
			</button>
		</div>

		<!-- Mobile Menu Dropdown -->
		<div
			v-show="showMenu"
			class="animate-fade-in mobile-menu-dropdown"
		>
			<div class="mobile-menu-list">
				<NuxtLink
					v-for="item in menuItems"
					:key="item.name"
					:to="item.to"
					class="mobile-menu-link"
					@click="closeMenu"
				>
					<Icon
						:name="item.icon"
						class="icon-mobile"
					/>
					{{ item.name }}
				</NuxtLink>

				<button
					type="button"
					class="mobile-menu-link"
					@click="signOut"
				>
					<Icon
						name="carbon:logout"
						class="icon-mobile"
					/>
					Logout
				</button>
			</div>
		</div>
	</nav>
</template>

<style scoped>
.desktop-menu {
	display: none;
	height: 3.5rem;
	justify-content: space-between;
	background: #fff;
	padding-inline: 1rem;
	padding-block: 0.5rem;
	box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.06);

	.menu-link {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		border-radius: 0.5rem;
		padding-inline: 0.75rem;
		padding-block: 0.5rem;
		color: #4b5563;
		transition:
			background 0.2s,
			color 0.2s;
		background: none;
		border: none;
		font: inherit;
		cursor: pointer;

		&:hover {
			background: #f3f4f6;
		}
	}
}

@media (min-width: 768px) {
	.desktop-menu {
		display: flex;
	}
	.mobile-menu-btn,
	.mobile-menu-dropdown {
		display: none !important;
	}
}

.mobile-menu-btn {
	position: fixed;
	right: 1rem;
	top: 1rem;
	z-index: 50;
	display: block;

	.mobile-btn {
		display: flex;
		height: 3rem;
		width: 3rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		background: #fff;
		color: #4b5563;
		box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.06);
		transition: transform 0.2s;
		border: none;
		cursor: pointer;

		&:hover {
			transform: scale(1.05);
		}
		&:active {
			transform: scale(0.95);
		}

		.hamburger {
			display: flex;
			height: 1rem;
			width: 1.25rem;
			flex-direction: column;
			justify-content: space-between;

			.bar {
				height: 2px;
				width: 100%;
				background: currentColor;
				border-radius: 1px;
			}
		}

		.icon-close {
			height: 1.5rem;
			width: 1.5rem;
		}
	}
}

.mobile-menu-dropdown {
	animation: fadeIn 0.2s ease-out;
	position: fixed;
	inset: 0;
	z-index: 40;
	display: flex;
	flex-direction: column;
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(4px);

	.mobile-menu-list {
		margin-top: 5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 2rem;

		.mobile-menu-link {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			border-radius: 0.5rem;
			padding-inline: 1.5rem;
			padding-block: 0.75rem;
			font-size: 1.25rem;
			color: #4b5563;
			transition:
				background 0.2s,
				color 0.2s;
			background: none;
			border: none;
			font: inherit;
			cursor: pointer;

			&:hover {
				background: #f3f4f6;
			}

			.icon-mobile {
				height: 1.5rem;
				width: 1.5rem;
			}
		}
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
