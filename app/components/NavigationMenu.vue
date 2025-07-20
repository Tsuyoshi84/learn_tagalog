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
	block-size: 3.5rem;
	padding-inline: 1rem;
	padding-block: 0.5rem;
	justify-content: space-between;
	background: #fff;
	box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.06);

	.menu-link {
		display: flex;
		padding-inline: 0.75rem;
		padding-block: 0.5rem;
		border: none;
		border-radius: 0.5rem;
		align-items: center;
		gap: 0.25rem;
		font: inherit;
		color: #4b5563;
		background: none;
		transition:
			background 0.2s,
			color 0.2s;
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
	z-index: 50;
	inset-inline-end: 1rem;
	inset-block-start: 1rem;
	display: block;

	.mobile-btn {
		display: flex;
		inline-size: 3rem;
		block-size: 3rem;
		border: none;
		border-radius: 9999px;
		align-items: center;
		justify-content: center;
		color: #4b5563;
		background: #fff;
		box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.06);
		transition: transform 0.2s;
		cursor: pointer;

		&:hover {
			transform: scale(1.05);
		}
		&:active {
			transform: scale(0.95);
		}

		.hamburger {
			display: flex;
			inline-size: 1.25rem;
			block-size: 1rem;
			flex-direction: column;
			justify-content: space-between;

			.bar {
				inline-size: 100%;
				block-size: 2px;
				border-radius: 1px;
				background: currentColor;
			}
		}

		.icon-close {
			inline-size: 1.5rem;
			block-size: 1.5rem;
		}
	}
}

.mobile-menu-dropdown {
	position: fixed;
	z-index: 40;
	inset: 0;
	display: flex;
	flex-direction: column;
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(4px);
	animation: fadeIn 0.2s ease-out;

	.mobile-menu-list {
		display: flex;
		margin-block-start: 5rem;
		padding: 2rem;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;

		.mobile-menu-link {
			display: flex;
			padding-inline: 1.5rem;
			padding-block: 0.75rem;
			border: none;
			border-radius: 0.5rem;
			align-items: center;
			gap: 0.5rem;
			font: inherit;
			font-size: 1.25rem;
			color: #4b5563;
			background: none;
			transition:
				background 0.2s,
				color 0.2s;
			cursor: pointer;

			&:hover {
				background: #f3f4f6;
			}

			.icon-mobile {
				inline-size: 1.5rem;
				block-size: 1.5rem;
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
